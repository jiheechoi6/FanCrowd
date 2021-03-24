import { IFandomMember } from "../interfaces/IUser";
import mongoose from "mongoose";

const FandomMemberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ref is required"]
    },
    fandom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fandom",
      required: [true, "Fandom ref is required"]
    }
  },
  { versionKey: false }
);

export default mongoose.model<IFandomMember & mongoose.Document>(
  "FandomMember",
  FandomMemberSchema
);
