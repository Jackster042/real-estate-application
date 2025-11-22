import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

interface DecodeToken extends JwtPayload {
  sub: string;
  "custom:role"?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export const authMiddleware = (allowedRules: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    try {
      const decoded = jwt.decode(token) as DecodeToken;
      const userRole = decoded["custom:role"] || "";

      req.user = {
        id: decoded.sub,
        role: userRole,
      };

      const hasAccess = allowedRules.includes(userRole.toLowerCase());
      if (!hasAccess) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
    next();
  };
};
