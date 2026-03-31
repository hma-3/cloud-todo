import { TaskPriority, TaskStatus } from "@prisma/client";
import { z } from "zod";

export const taskIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const createTaskDtoSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().max(500).optional(),
  status: z.nativeEnum(TaskStatus).optional().default(TaskStatus.NEW),
  priority: z.nativeEnum(TaskPriority).optional().default(TaskPriority.MEDIUM),
  dueDate: z.coerce.date().optional(),
});

export const putTaskDtoSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().max(500).nullable().optional(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  dueDate: z.coerce.date().nullable().optional(),
});

export const patchTaskDtoSchema = z
  .object({
    status: z.nativeEnum(TaskStatus).optional(),
    priority: z.nativeEnum(TaskPriority).optional(),
  })
  .refine(
    (value) => value.status !== undefined || value.priority !== undefined,
    {
      message: "At least one field is required.",
    },
  );

export const listTasksQuerySchema = z.object({
  status: z.nativeEnum(TaskStatus).optional(),
  priority: z.nativeEnum(TaskPriority).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  offset: z.coerce.number().int().min(0).optional().default(0),
});

export type CreateTaskDto = z.infer<typeof createTaskDtoSchema>;
export type PutTaskDto = z.infer<typeof putTaskDtoSchema>;
export type PatchTaskDto = z.infer<typeof patchTaskDtoSchema>;
export type ListTasksQueryDto = z.infer<typeof listTasksQuerySchema>;
