import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/appError";

export const apiKeyAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const configuredApiKey = process.env.API_KEY;
  if (!configuredApiKey) {
    return next(
      new AppError(500, "API_KEY_NOT_CONFIGURED", "API key is not configured."),
    );
  }

  const headerApiKey = req.header("X-API-Key");
  if (headerApiKey !== configuredApiKey) {
    return next(new AppError(401, "UNAUTHORIZED", "Invalid API key."));
  }

  return next();
};
