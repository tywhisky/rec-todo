import { v4 as uuidv4 } from 'uuid';

export interface Task {
  id: string;
  pos?: number;
  title: string;
  description?: string;
  completed?: boolean;
  deadline: Date | null;
  insertedAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

interface NewTaskInput {
  title: string;
  description?: string;
  deadline: Date | null;
}

export interface UpdateTaskInput {
  pos?: number;
  title?: string;
  description?: string;
  completed?: boolean;
  deadline: Date | null;
  insertedAt?: Date;
  updatedAt?: Date;
  completedAt?: Date;
}

export class NewTask implements Task {
  id: string;
  pos?: number;
  title: string;
  description?: string;
  completed?: boolean;
  deadline: Date | null;
  insertedAt: Date;
  updatedAt: Date;
  completedAt?: Date;

  constructor(data: NewTaskInput) {
    const currentDate = new Date();

    this.id = uuidv4();
    this.pos = 0;
    this.title = data.title;
    this.description = data.description;
    this.completed = false;
    this.deadline = data.deadline && data.deadline || null;
    this.insertedAt = currentDate;
    this.updatedAt = currentDate;
  }
}
