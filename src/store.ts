import { Store } from "tauri-plugin-store-api";
import { Task, NewTask, UpdateTaskInput } from "./types/Task";
import { create } from 'zustand'

const store = new Store(".tasks.dat");

const getTasks = async () => {
  const tasks = await store.get("tasks") || []
  return tasks;
}

const addTask = async (task: NewTask) => {
  const tasks = await getTasks() as Task[];
  tasks.push(task)
  await store.set("tasks", tasks);
  return tasks;
}

const deleteTask = async (id: string) => {
  const tasks = await getTasks() as Task[];
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    await store.set("tasks", tasks);
    return tasks;
  } else {
    console.error(`Task with ID ${id} not found.`);
    return tasks;
  }
}

const updateTask = async (id: string, task: UpdateTaskInput) => {
  const tasks = await getTasks() as Task[];
  const taskIndex = tasks.findIndex(t => t.id === id)
  if (taskIndex !== -1) {
    const newTask = { ...tasks[taskIndex], ...task }
    const newTasks = [...tasks.slice(0, taskIndex), newTask, ...tasks.slice(taskIndex + 1)];
    await store.set("tasks", newTasks);
    return newTasks;
  } else {
    console.error(`Task with ID ${id} not found.`);
    return tasks;
  }
}

const reorderTasks = async (source_idx: number, destination_idx: number) => {
  const tasks = await getTasks() as Task[];
  const unCompletedTasks = tasks.filter(t => t.completed == false)
  const completedTasks = tasks.filter(t => t.completed == true)

  const items = [...unCompletedTasks];
  const [draggedItem] = items.splice(source_idx, 1);
  items.splice(destination_idx, 0, draggedItem).concat(completedTasks);

  const newTasks = items.concat(completedTasks)
  await store.set("tasks", newTasks)
  return newTasks;
}

export const useTaskStore = create((set) => ({
  tasks: [],
  addTask: async (task: NewTask) => {
    const tasks = await addTask(task)
    set({ tasks: tasks })
  },
  getTasks: async () => {
    const tasks = await getTasks();
    set({ tasks: tasks })
  },
  deleteTask: async (id: string) => {
    const tasks = await deleteTask(id);
    set({ tasks: tasks })
  },
  completeTask: async (id: string) => {
    const current = new Date();
    const tasks = await updateTask(id, { completed: true, updated_at: current })
    set({ tasks: tasks })
  },
  undoCompleteTask: async (id: string) => {
    const current = new Date();
    const tasks = await updateTask(id, { completed: false, updated_at: current })
    set({ tasks: tasks })
  },
  reorderTasks: async (source_idx: number, destination_idx: number) => {
    const tasks = await reorderTasks(source_idx, destination_idx)
    set({ tasks: tasks })
  }
}))
