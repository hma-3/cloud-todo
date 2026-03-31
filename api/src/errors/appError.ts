export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
    public readonly details: unknown[] = [],
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const errorResponse = (
  code: string,
  message: string,
  details: unknown[] = [],
) => ({
  code,
  message,
  details,
});
