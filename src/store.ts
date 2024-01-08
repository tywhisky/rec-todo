import { Store } from "tauri-plugin-store-api";
import { Task, NewTask, UpdateTaskInput } from "./types/Task";
import { create } from 'zustand'

const store = new Store(".tasks.dat");

export const getTasks = async () => {
  const tasks = await store.get("tasks") || []
  return tasks;
}

export const addTask = async (task: NewTask) => {
  const tasks = await getTasks() as Task[];
  tasks.push(task)
  await store.set("tasks", tasks);
  return tasks;
}

export const deleteTask = async (id: string) => {
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

export const updateTask = async (id: string, task: UpdateTaskInput) => {
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
    const tasks = await deleteTask(id)
    set({ tasks: tasks })
  },
  completeTask: async (id: string) => {
    const tasks = await updateTask(id, { completed: true })
    set({ tasks: tasks })
  }
}))
