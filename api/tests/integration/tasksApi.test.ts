import { TaskPriority, TaskStatus } from "@prisma/client";
import request from "supertest";

import { app } from "../../src/app";
import { TaskRepository } from "../../src/repositories/taskRepository";

const now = new Date("2026-01-01T00:00:00.000Z");
const taskId = "8e9853d8-9f78-4c46-a3d4-ae849f42e996";

describe("tasks API integration", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    process.env.API_KEY = "test-key";
  });

  it("lists tasks with 200", async () => {
    jest.spyOn(TaskRepository.prototype, "list").mockResolvedValue([
      {
        id: taskId,
        title: "My task",
        description: null,
        status: TaskStatus.NEW,
        priority: TaskPriority.MEDIUM,
        dueDate: null,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    const response = await request(app).get("/api/tasks?limit=5&offset=0");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it("creates task with 201 when api key is valid", async () => {
    jest.spyOn(TaskRepository.prototype, "create").mockResolvedValue({
      id: taskId,
      title: "Created",
      description: "Details",
      status: TaskStatus.NEW,
      priority: TaskPriority.HIGH,
      dueDate: null,
      createdAt: now,
      updatedAt: now,
    });

    const response = await request(app)
      .post("/api/tasks")
      .set("X-API-Key", "test-key")
      .send({
        title: "Created",
        description: "Details",
        priority: "HIGH",
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Created");
  });

  it("returns 400 for invalid payload with stable error shape", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("X-API-Key", "test-key")
      .send({
        title: "ab",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        code: "VALIDATION_ERROR",
        message: "Invalid request.",
      }),
    );
    expect(Array.isArray(response.body.details)).toBe(true);
  });
});
