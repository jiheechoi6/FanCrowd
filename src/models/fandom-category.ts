import { IFandomCategory } from "../interfaces/IFandom";
import mongoose from "mongoose";
import Fandom from "./fandom";

const FandomCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      lowercase: true,
      validate(value: string) {
        const categoryNameRegex = /^[a-z\d\'\s]+$/;
        if (!categoryNameRegex.test(value)) {
          throw new Error(
            "Category name can only contain alphanumeric characters, spaces and '"
          );
        }
      }
    },
    backgroundURL: {
      type: String,
      required: [true, "Fandom category background URL is required"],
      default: "https://cdn.hipwallpaper.com/i/96/43/B7R52d.jpg"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Fandom category must be associated to a user"]
    }
  },
  { versionKey: false }
);

FandomCategorySchema.post("remove", async function () {
  const categoryId = this._id;
  await Fandom.deleteMany({ category: categoryId });
});

export default mongoose.model<IFandomCategory & mongoose.Document>(
  "FandomCategory",
  FandomCategorySchema
);
