import { Prisma, Task } from "@prisma/client";

import { AppError } from "../errors/appError";
import {
  CreateTaskDto,
  ListTasksQueryDto,
  PatchTaskDto,
  PutTaskDto,
} from "../dto/taskDtos";
import { TaskRepository } from "../repositories/taskRepository";

export class TaskService {
  constructor(
    private readonly repository: TaskRepository = new TaskRepository(),
  ) {}

  async createTask(data: CreateTaskDto): Promise<Task> {
    try {
      return await this.repository.create(data);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async listTasks(query: ListTasksQueryDto): Promise<Task[]> {
    return this.repository.list(query);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.repository.findById(id);
    if (!task) {
      throw new AppError(404, "TASK_NOT_FOUND", "Task not found.");
    }
    return task;
  }

  async putTask(id: string, data: PutTaskDto): Promise<Task> {
    await this.ensureExists(id);
    return this.updateInternal(id, data);
  }

  async patchTask(id: string, data: PatchTaskDto): Promise<Task> {
    await this.ensureExists(id);
    return this.updateInternal(id, data);
  }

  async deleteTask(id: string): Promise<void> {
    await this.ensureExists(id);
    try {
      await this.repository.delete(id);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  private async ensureExists(id: string): Promise<void> {
    const task = await this.repository.findById(id);
    if (!task) {
      throw new AppError(404, "TASK_NOT_FOUND", "Task not found.");
    }
  }

  private async updateInternal(
    id: string,
    data: Prisma.TaskUpdateInput,
  ): Promise<Task> {
    try {
      return await this.repository.update(id, data);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  private handlePrismaError(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new AppError(
        409,
        "CONFLICT",
        "A task with this data already exists.",
      );
    }
    throw new AppError(500, "INTERNAL_ERROR", "Internal server error.");
  }
}
