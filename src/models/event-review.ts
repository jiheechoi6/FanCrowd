import { IEventReview } from "../interfaces/IEvent";
import mongoose from "mongoose";

const EventReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event review title is required"]
    },
    content: {
      type: String,
      required: [true, "Event review content is required"]
    },
    rating: {
      type: Number,
      required: [true, "Event review rating is required"],
      min: 0,
      max: 5
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Event review must be associated to a user"]
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event review must be associated to an event"]
    }
  },
  { timestamps: { updatedAt: true }, versionKey: false }
);

export default mongoose.model<IEventReview & mongoose.Document>(
  "EventReview",
  EventReviewSchema
);
