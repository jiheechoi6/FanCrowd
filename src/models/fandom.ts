import { IFandom } from "../interfaces/IFandom";
import mongoose from "mongoose";

const FandomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Fandom name is required"],
      lowercase: true,
      unique: false
    },
    backgroundURL: {
      type: String,
      required: [true, "Fandom background URL is required"]
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FandomCategory",
      required: [true, "Fandom must be associated to a category"],
      unique: false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Fandom must be associated to a user"]
    }
  },
  { timestamps: { updatedAt: false }, versionKey: false }
);

FandomSchema.index({ name: 1, category: 1 }, { unique: true, dropDups: true });

export default mongoose.model<IFandom & mongoose.Document>(
  "Fandom",
  FandomSchema
);
