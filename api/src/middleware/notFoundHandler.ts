import { Request, Response } from "express";

import { errorResponse } from "../errors/appError";

export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json(errorResponse("NOT_FOUND", "Route not found."));
};
