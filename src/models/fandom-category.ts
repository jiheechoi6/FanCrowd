import { IFandomCategory } from "../interfaces/IFandom";
import mongoose from "mongoose";

const FandomCategorySchema = new mongoose.Schema({
  name: {
    type: String
  },
  backgroundURL: {
    type: String
  }
});

export default mongoose.model<IFandomCategory & mongoose.Document>(
  "FandomCategory",
  FandomCategorySchema
);
