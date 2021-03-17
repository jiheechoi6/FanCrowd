import { IFandomComment } from "../interfaces/IFandom";
import mongoose from "mongoose";

const FandomPostSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    content: {
      type: String
    },
    postedBy: {
      //add ref to user instance
    },
    fandomPostRef: {
      //ref to fandom instance
    }
  },
  { timestamps: true }
);

export default mongoose.model<IFandomComment & mongoose.Document>(
  "FandomPost",
  FandomPostSchema
);
