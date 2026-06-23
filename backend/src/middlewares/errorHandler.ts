import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[error]: ${err.stack || err.message}`);
  
  res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};
