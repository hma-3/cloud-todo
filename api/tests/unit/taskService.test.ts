import { TaskPriority, TaskStatus } from "@prisma/client";

import { TaskRepository } from "../../src/repositories/taskRepository";
import { TaskService } from "../../src/services/taskService";

const now = new Date("2026-01-01T00:00:00.000Z");

const baseTask = {
  id: "8e9853d8-9f78-4c46-a3d4-ae849f42e996",
  title: "Test task",
  description: null,
  status: TaskStatus.NEW,
  priority: TaskPriority.MEDIUM,
  dueDate: null,
  createdAt: now,
  updatedAt: now,
};

describe("TaskService", () => {
  it("returns task by id", async () => {
    const repository = {
      findById: jest.fn().mockResolvedValue(baseTask),
    } as unknown as TaskRepository;

    const service = new TaskService(repository);
    const task = await service.getTaskById(baseTask.id);

    expect(task.id).toBe(baseTask.id);
  });

  it("throws 404 when task is missing", async () => {
    const repository = {
      findById: jest.fn().mockResolvedValue(null),
    } as unknown as TaskRepository;

    const service = new TaskService(repository);

    await expect(service.getTaskById(baseTask.id)).rejects.toEqual(
      expect.objectContaining({
        statusCode: 404,
        code: "TASK_NOT_FOUND",
      }),
    );
  });

  it("lists tasks with filter", async () => {
    const repository = {
      list: jest.fn().mockResolvedValue([baseTask]),
    } as unknown as TaskRepository;

    const service = new TaskService(repository);
    const result = await service.listTasks({
      status: TaskStatus.NEW,
      priority: TaskPriority.MEDIUM,
      limit: 10,
      offset: 0,
    });

    expect(result).toHaveLength(1);
  });

  it("creates task via repository", async () => {
    const repository = {
      create: jest.fn().mockResolvedValue(baseTask),
    } as unknown as TaskRepository;

    const service = new TaskService(repository);
    const result = await service.createTask({
      title: "Created task",
      status: TaskStatus.NEW,
      priority: TaskPriority.MEDIUM,
    });

    expect(result.id).toBe(baseTask.id);
  });
});
