import { IUserLike } from "../interfaces/IUser";
import mongoose from "mongoose";

const UserLikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ref is required"]
  },
  fandomPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FandomPost"
  },
  fandomComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FandomComment"
  },
  isLike: {
    type: Boolean,
    required: true
  }
});

export default mongoose.model<IUserLike & mongoose.Document>(
  "UserLike",
  UserLikeSchema
);
