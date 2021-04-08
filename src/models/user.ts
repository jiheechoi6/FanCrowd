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
      default: ""
    },
    profileURL: {
      type: String,
      default:
        "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
    },
    city: {
      type: String,
      default: ""
    },
    country: {
      type: String,
      default: ""
    },
    resetPasswordToken: {
      token: {
        type: String
      },
      expiresIn: {
        type: Date
      }
    },
    isBanned: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: { updatedAt: false }, versionKey: false }
);

UserSchema.pre("remove", async function (next) {
  next();
});

export default mongoose.model<IUser & mongoose.Document>("User", UserSchema);
