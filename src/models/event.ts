import { IEvent } from "../interfaces/IEvent";
import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Event name is required"]
  },
  description: {
    type: String,
    required: [true, "Event description is required"]
  },
  location: {
    type: String,
    required: [true, "Event location is required"]
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Event must be associated to a user"]
  },
  startDate: {
    type: Date,
    required: [true, "Event start date is required"],
    validate(value: Date) {
      const currentDate = new Date();
      if (value < currentDate) {
        throw new Error("Event start date must be in the future");
      }
    }
  },
  endDate: {
    type: Date,
    required: [true, "Event end date is required"]
  },
  fandom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fandom",
    required: [true, "Event must be associated to a fandom"]
  }
});

export default mongoose.model<IEvent & mongoose.Document>("Event", EventSchema);
