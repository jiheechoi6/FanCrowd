import { IFandomPost } from "../interfaces/IFandom";
import mongoose from "mongoose";

const FandomPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Fandom post title is required"]
    },
    content: {
      type: String,
      required: [true, "Fandom post content is required"]
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Fandom post must be associated to a user"]
    },
    fandom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fandom",
      required: [true, "Fandom post must be associated to a fandom"]
    }
  },
  { timestamps: true }
);

export default mongoose.model<IFandomPost & mongoose.Document>(
  "FandomPost",
  FandomPostSchema
);
