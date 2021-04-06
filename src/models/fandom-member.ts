import { IFandomMember } from "../interfaces/IUser";
import mongoose from "mongoose";

const FandomMemberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ref is required"],
      unique: false
    },
    fandom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fandom",
      required: [true, "Fandom ref is required"],
      unique: false
    }
  },
  { versionKey: false }
);

FandomMemberSchema.index(
  { user: 1, fandom: 1 },
  { unique: true, dropDups: true }
);

export default mongoose.model<IFandomMember & mongoose.Document>(
  "FandomMember",
  FandomMemberSchema
);
