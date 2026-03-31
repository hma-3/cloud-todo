import { TaskPriority, TaskStatus } from "@prisma/client";

import {
  createTaskDtoSchema,
  listTasksQuerySchema,
  patchTaskDtoSchema,
} from "../../src/dto/taskDtos";

describe("task DTO validation", () => {
  it("accepts valid create payload", () => {
    const parsed = createTaskDtoSchema.parse({
      title: "Valid task title",
      description: "Description",
      status: TaskStatus.NEW,
      priority: TaskPriority.HIGH,
    });

    expect(parsed.title).toBe("Valid task title");
  });

  it("rejects too short title", () => {
    expect(() =>
      createTaskDtoSchema.parse({
        title: "ab",
      }),
    ).toThrow();
  });

  it("requires patch status or priority", () => {
    expect(() => patchTaskDtoSchema.parse({})).toThrow();
  });

  it("parses list pagination defaults", () => {
    const parsed = listTasksQuerySchema.parse({});
    expect(parsed.limit).toBe(20);
    expect(parsed.offset).toBe(0);
  });
});
