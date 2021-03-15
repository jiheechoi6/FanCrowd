import { NextFunction, Request, Response } from "express";
import config from "../../config";

/**
 * Checks if a user is authorized
 */
const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    next(err);
  }
};

export default isAuth;
