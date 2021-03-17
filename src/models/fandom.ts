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
    categoryRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FandomCategory",
      required: [true, "Fandom must be associated to a category"]
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Fandom must be associated to a user"]
    }
  },
  { timestamps: { createdAt: true } }
);

export default mongoose.model<IFandom & mongoose.Document>(
  "Fandom",
  FandomSchema
);
