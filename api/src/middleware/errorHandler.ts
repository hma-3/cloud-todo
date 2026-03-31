import { NextFunction, Request, Response } from "express";

import { AppError, errorResponse } from "../errors/appError";
import { log } from "../utils/logger";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json(errorResponse(error.code, error.message, error.details));
  }

  log("error", "unhandled_error", {
    requestId: req.requestId,
    errorName: error instanceof Error ? error.name : "UnknownError",
    errorMessage: error instanceof Error ? error.message : "Unknown error",
  });

  return res
    .status(500)
    .json(errorResponse("INTERNAL_ERROR", "Internal server error."));
};
