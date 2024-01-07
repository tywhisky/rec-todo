import { Store } from "tauri-plugin-store-api";
import { Task, NewTask } from "./types/Task";

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
