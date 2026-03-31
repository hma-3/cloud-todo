import { Router } from "express";

import { TaskController } from "../controllers/taskController";
import { apiKeyAuth } from "../middleware/apiKeyAuth";

const taskController = new TaskController();

export const taskRoutes = Router();

taskRoutes.get("/", taskController.listTasks);
taskRoutes.get("/:id", taskController.getTaskById);
taskRoutes.post("/", apiKeyAuth, taskController.createTask);
taskRoutes.put("/:id", apiKeyAuth, taskController.putTask);
taskRoutes.patch("/:id", apiKeyAuth, taskController.patchTask);
taskRoutes.delete("/:id", apiKeyAuth, taskController.deleteTask);
