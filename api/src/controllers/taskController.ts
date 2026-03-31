import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import {
  createTaskDtoSchema,
  listTasksQuerySchema,
  patchTaskDtoSchema,
  putTaskDtoSchema,
  taskIdParamSchema,
} from "../dto/taskDtos";
import { AppError } from "../errors/appError";
import { TaskService } from "../services/taskService";

export class TaskController {
  constructor(private readonly taskService: TaskService = new TaskService()) {}

  createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = createTaskDtoSchema.parse(req.body);
      const task = await this.taskService.createTask(dto);
      res.status(201).json(task);
    } catch (error) {
      next(this.mapValidationError(error));
    }
  };

  listTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = listTasksQuerySchema.parse(req.query);
      const tasks = await this.taskService.listTasks(query);
      res.status(200).json(tasks);
    } catch (error) {
      next(this.mapValidationError(error));
    }
  };

  getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = taskIdParamSchema.parse(req.params);
      const task = await this.taskService.getTaskById(id);
      res.status(200).json(task);
    } catch (error) {
      next(this.mapValidationError(error));
    }
  };

  putTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = taskIdParamSchema.parse(req.params);
      const dto = putTaskDtoSchema.parse(req.body);
      const task = await this.taskService.putTask(id, dto);
      res.status(200).json(task);
    } catch (error) {
      next(this.mapValidationError(error));
    }
  };

  patchTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = taskIdParamSchema.parse(req.params);
      const dto = patchTaskDtoSchema.parse(req.body);
      const task = await this.taskService.patchTask(id, dto);
      res.status(200).json(task);
    } catch (error) {
      next(this.mapValidationError(error));
    }
  };

  deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = taskIdParamSchema.parse(req.params);
      await this.taskService.deleteTask(id);
      res.status(204).send();
    } catch (error) {
      next(this.mapValidationError(error));
    }
  };

  private mapValidationError(error: unknown): unknown {
    if (error instanceof ZodError) {
      return new AppError(
        400,
        "VALIDATION_ERROR",
        "Invalid request.",
        error.issues,
      );
    }
    return error;
  }
}
