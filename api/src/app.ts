import { existsSync } from "node:fs";
import path from "node:path";
import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";
import { requestIdMiddleware } from "./middleware/requestId";
import { requestLogger } from "./middleware/requestLogger";
import { taskRoutes } from "./routes/taskRoutes";

export const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN ?? "*" }));
app.use(express.json());
app.use(requestIdMiddleware);
app.use(requestLogger);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/tasks", taskRoutes);

const webDistPath = process.env.WEB_DIST_PATH
  ? path.resolve(process.env.WEB_DIST_PATH)
  : path.resolve(process.cwd(), "../web/dist");

if (existsSync(webDistPath)) {
  app.use(express.static(webDistPath));
  app.get("/{*path}", (req, res, next) => {
    if (req.path.startsWith("/api") || req.path === "/health") {
      return next();
    }

    return res.sendFile(path.join(webDistPath, "index.html"));
  });
}

app.use(notFoundHandler);
app.use(errorHandler);
