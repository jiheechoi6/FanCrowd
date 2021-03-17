import { IUser } from "../interfaces/IUser";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String
    },
    email: {
      type: String
    },
    username: {
      type: String
    },
    password: {
      type: String
    },
    role: {
      type: String
    },
    bio: {
      type: String
    },
    profileURL: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    }
  },
  { timestamps: { createdAt: true } }
);

export default mongoose.model<IUser & mongoose.Document>("User", UserSchema);
