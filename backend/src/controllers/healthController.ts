import { Request, Response } from "express";

export const getHealthStatus = (req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Portfolio API is healthy",
    timestamp: new Date().toISOString(),
  });
};
