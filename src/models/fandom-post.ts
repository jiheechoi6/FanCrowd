import { IFandomPost } from "../interfaces/IFandom";
import mongoose from "mongoose";

const FandomPostSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    content: {
      type: String,
      required: true
    },
    postedBy: {
      //add ref to user instance
    },
    fandomRef: {
      //ref to fandom instance
    }
  },
  { timestamps: true }
);

export default mongoose.model<IFandomPost & mongoose.Document>(
  "FandomPost",
  FandomPostSchema
);
