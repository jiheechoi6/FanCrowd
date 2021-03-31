import mongoose from "mongoose";
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
    reqUserId: mongoose.Types._ObjectId | string,
    errMsg: string
  ) {
    if (createdByUserId !== reqUserId) {
      throw new ErrorService("UnauthorizedError", errMsg);
    }
  }
}
