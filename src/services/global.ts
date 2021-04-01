import mongoose from "mongoose";
import { IRequestUser } from "../interfaces/IUser";
import ErrorService from "./error";

export default class GlobalService {
  public checkValidObjectId(
    id: mongoose.Types._ObjectId | string,
    errorMessage: string
  ) {
    if (!mongoose.isValidObjectId(id)) {
      throw new ErrorService("NotFoundError", errorMessage);
    }
  }

  public hasPermission(
    createdByUserId: mongoose.Types._ObjectId | string,
    reqUser: IRequestUser,
    errMsg: string
  ) {
    if (reqUser.role !== "admin" && !reqUser._id.equals(createdByUserId)) {
      throw new ErrorService("UnauthorizedError", errMsg);
    }
  }
}
