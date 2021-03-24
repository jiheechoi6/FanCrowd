import { IFandom } from "../interfaces/IFandom";
import mongoose from "mongoose";

const FandomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Fandom name is required"]
    },
    backgroundURL: {
      type: String,
      required: [true, "Fandom background URL is required"]
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FandomCategory",
      required: [true, "Fandom must be associated to a category"]
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Fandom must be associated to a user"]
    }
  },
  { timestamps: { createdAt: true }, versionKey: false }
);

export default mongoose.model<IFandom & mongoose.Document>(
  "Fandom",
  FandomSchema
);
