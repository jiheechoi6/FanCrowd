import { IFandomComment } from "../interfaces/IFandom";
import mongoose from "mongoose";
import UserLike from "./user-like";

const FandomCommentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Fandom comment title is required"]
    },
    content: {
      type: String,
      required: [true, "Fandom comment content is required"]
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Fandom comment must be associated to a user"]
    },
    fandomPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FandomPost",
      required: [true, "Fandom comment must be associated to a fandom post"]
    }
  },
  { timestamps: { updatedAt: false }, versionKey: false }
);

FandomCommentSchema.post("remove", async function () {
  const commentId = this._id;
  await UserLike.deleteMany({ fandomComment: commentId });
});

export default mongoose.model<IFandomComment & mongoose.Document>(
  "FandomComment",
  FandomCommentSchema
);
