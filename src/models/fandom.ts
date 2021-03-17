import { IFandom } from "../interfaces/IFandom";
import mongoose from "mongoose";

const FandomSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    backgroundURL: {
      type: String
    },
    category: {
      //add ref to fandom-category instance
    }
  },
  { timestamps: { createdAt: true } }
);

export default mongoose.model<IFandom & mongoose.Document>(
  "Fandom",
  FandomSchema
);
