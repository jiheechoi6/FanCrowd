import { IFandomComment } from "../interfaces/IFandom";
import mongoose from "mongoose";

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
  { timestamps: { createdAt: true }, versionKey: false }
);

export default mongoose.model<IFandomComment & mongoose.Document>(
  "FandomComment",
  FandomCommentSchema
);
