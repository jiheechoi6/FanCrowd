import ErrorService from "../../services/error";
import { NextFunction, Request, Response } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    throw new ErrorService(
      "UnauthorizedError",
      "Unauthorized, only admins have access"
    );
  }
  next();
};

export default isAdmin;
