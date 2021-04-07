import { IFandom } from "../interfaces/IFandom";
import mongoose from "mongoose";
import FandomMember from "./fandom-member";
import FandomPost from "./fandom-post";
import Event from "./event";

const FandomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Fandom name is required"],
      lowercase: true,
      unique: false,
      validate(value: string) {
        const fandomNameRegex = /^[a-z\d\'\s]+$/;
        if (!fandomNameRegex.test(value)) {
          throw new Error(
            "Fandom name can only contain alphanumeric characters, spaces and '"
          );
        }
      }
    },
    backgroundURL: {
      type: String,
      required: [true, "Fandom background URL is required"],
      default: "https://cdn.hipwallpaper.com/i/96/43/B7R52d.jpg"
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

FandomSchema.post("remove", async function () {
  const fandomId = this._id;

  await FandomMember.deleteMany({ fandom: fandomId });
  await FandomPost.deleteMany({ fandom: fandomId });
  await Event.deleteMany({ fandom: fandomId });
});

export default mongoose.model<IFandom & mongoose.Document>(
  "Fandom",
  FandomSchema
);
