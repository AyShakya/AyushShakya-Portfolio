import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export interface AuthenticatedRequest extends Request {
  adminEmail?: string;
}

export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ status: "error", message: "Unauthorized. Admin token missing." });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.jwtSecret) as { email: string };
    
    if (decoded.email !== config.adminEmail) {
      res.status(403).json({ status: "error", message: "Forbidden. Access restricted to administrator." });
      return;
    }

    req.adminEmail = decoded.email;
    next();
  } catch (error) {
    res.status(401).json({ status: "error", message: "Unauthorized. Invalid or expired token." });
  }
};
