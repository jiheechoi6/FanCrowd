import { IAttendEvent } from "../interfaces/IUser";
import mongoose from "mongoose";

const AttendSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ref is required"]
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ref is required"]
    }
  },
  { versionKey: false }
);

export default mongoose.model<IAttendEvent & mongoose.Document>(
  "Attend",
  AttendSchema
);
