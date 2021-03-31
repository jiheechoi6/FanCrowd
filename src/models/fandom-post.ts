import { IFandomPost } from "../interfaces/IFandom";
import mongoose from "mongoose";
import FandomComment from "./fandom-comment";
import UserLike from "./user-like";

const FandomPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Fandom post title is required"]
    },
    content: {
      type: String,
      required: [true, "Fandom post content is required"]
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Fandom post must be associated to a user"]
    },
    fandom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fandom",
      required: [true, "Fandom post must be associated to a fandom"]
    }
  },
  { timestamps: { updatedAt: false }, versionKey: false }
);

FandomPostSchema.post("remove", async function () {
  const postId = this._id;

  await FandomComment.deleteMany({ fandomPost: postId });
  await UserLike.deleteMany({ fandomPost: postId });
});

export default mongoose.model<IFandomPost & mongoose.Document>(
  "FandomPost",
  FandomPostSchema
);
