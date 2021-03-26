import { IFandomCategory } from "../interfaces/IFandom";
import mongoose from "mongoose";

const FandomCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Fandom category title is required"],
      unique: true,
      lowercase: true
    },
    backgroundURL: {
      type: String,
      required: [true, "Fandom category background URL is required"]
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Fandom category must be associated to a user"]
    }
  },
  { versionKey: false }
);

export default mongoose.model<IFandomCategory & mongoose.Document>(
  "FandomCategory",
  FandomCategorySchema
);
