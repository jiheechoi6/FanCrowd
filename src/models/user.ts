import { IUser } from "../interfaces/IUser";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"]
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      validate(value: string) {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if (!emailRegex.test(value)) {
          throw new Error("Invalid email");
        }
      }
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
      validate(value: string) {
        const usernameRegex = /^[a-z0-9_]+$/;
        if (!usernameRegex.test(value)) {
          throw new Error(
            "Usernames can only contain lowercase characters, numbers, and underscores"
          );
        }
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"]
    },
    bio: {
      type: String,
      // required: [isNotAdmin, "Bio is required"],
      default: ""
    },
    profileURL: {
      type: String,
      // required: [isNotAdmin, "Profile URL is required"],
      default: ""
    },
    city: {
      type: String,
      // required: [isNotAdmin, "City is required"],
      default: ""
    },
    country: {
      type: String,
      // required: [isNotAdmin, "Country is required"],
      default: ""
    }
  },
  { timestamps: { updatedAt: false }, versionKey: false }
);

function isNotAdmin(this: IUser) {
  return this.role === "user";
}

//Remove all posts, comments, events,..etc when user is removed
UserSchema.pre("remove", async function (next) {
  console.log(this);
  next();
});

export default mongoose.model<IUser & mongoose.Document>("User", UserSchema);
