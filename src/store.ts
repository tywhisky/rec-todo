import { Store } from "tauri-plugin-store-api";
import { Task, NewTask, UpdateTaskInput } from "./types/Task";
import { create } from 'zustand'

const store = new Store(".tasks.dat");

const getTasks = async () => {
  const tasks = await store.get("tasks") || []
  return tasks;
}

const updateTasks = async (tasks: Task[]) => {
  await store.set("tasks", tasks)
}

// The follow functions do not have `store.set` because
// the store state should be updated after zustand.

const addTask = (tasks: Task[], task: NewTask) => {
  tasks.unshift(task)
  return tasks;
}

const deleteTask = (tasks: Task[], id: string) => {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    return tasks;
  } else {
    console.error(`Task with ID ${id} not found.`);
    return tasks;
  }
}

const updateTask = (tasks: Task[], id: string, task: UpdateTaskInput) => {
  const taskIndex = tasks.findIndex(t => t.id === id)
  if (taskIndex !== -1) {
    const newTask = { ...tasks[taskIndex], ...task }
    const newTasks = [...tasks.slice(0, taskIndex), newTask, ...tasks.slice(taskIndex + 1)];
    return newTasks;
  } else {
    console.error(`Task with ID ${id} not found.`);
    return tasks;
  }
}

export const useTaskStore = create((set, get: any) => ({
  tasks: [],
  getTasks: async () => {
    const tasks = await getTasks();
    set({ tasks: tasks });
  },
  addTask: (task: NewTask) => {
    const tasks = get().tasks;
    const newTasks = addTask(tasks, task);
    set({ tasks: newTasks });
  },
  deleteTask: (id: string) => {
    const tasks = get().tasks;
    const newTasks = deleteTask(tasks, id);
    set({ tasks: tasks });
    updateTasks(newTasks);
  },
  completeTask: (id: string) => {
    const tasks = get().tasks;
    const current = new Date();
    const newTasks = updateTask(tasks, id, { completed: true, updatedAt: current, completedAt: current });
    set({ tasks: newTasks });
    updateTasks(newTasks);
  },
  undoCompleteTask: (id: string) => {
    const tasks: Task[] = get().tasks;
    const current = new Date();
    const newTasks = updateTask(tasks, id, { completed: false, updatedAt: current });
    set({ tasks: newTasks });
    updateTasks(newTasks);
  },
  reorderTasks: (source_idx: number, destination_idx: number) => {
    const tasks: Task[] = get().tasks;

    const unCompletedTasks = tasks.filter(t => t.completed == false);
    const completedTasks = tasks.filter(t => t.completed == true);

    const items = [...unCompletedTasks];
    const [draggedItem] = items.splice(source_idx, 1);
    items.splice(destination_idx, 0, draggedItem).concat(completedTasks);
    const newTasks = items.concat(completedTasks);

    set({ tasks: newTasks });
    updateTasks(newTasks);
  }
}))
