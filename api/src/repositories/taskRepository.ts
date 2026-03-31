import { Prisma, Task } from "@prisma/client";

import { prisma } from "../db";

export type TaskListFilter = {
  status?: Task["status"];
  priority?: Task["priority"];
  limit: number;
  offset: number;
};

export class TaskRepository {
  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return prisma.task.create({ data });
  }

  async list(filter: TaskListFilter): Promise<Task[]> {
    const where: Prisma.TaskWhereInput = {
      status: filter.status,
      priority: filter.priority,
    };

    return prisma.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: filter.limit,
      skip: filter.offset,
    });
  }

  async findById(id: string): Promise<Task | null> {
    return prisma.task.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.task.delete({ where: { id } });
  }
}
