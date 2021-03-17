import { IAttendEvent } from "../interfaces/IUser";
import mongoose from "mongoose";

const AttendSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ref is required"]
  },
  eventRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: [true, "Event ref is required"]
  }
});

export default mongoose.model<IAttendEvent & mongoose.Document>(
  "Attend",
  AttendSchema
);
