
import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Wraps an async function and automatically catches errors.
 * Passes them to Express's `next()` error middleware.
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
