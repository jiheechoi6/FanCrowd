import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/user";

/**
 * Attaches user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // try {
  //   const userRecord = await UserModel.findById(req.token._id);
  //   if (!userRecord) {
  //     return res.sendStatus(401);
  //   }
  //   Reflect.deleteProperty(userRecord, "password");
  //   req.currentUser = userRecord;
  //   return next();
  // } catch (err) {
  //   return next(err);
  // }
};

export default attachCurrentUser;
