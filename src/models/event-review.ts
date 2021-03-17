import { IEventReview } from "../interfaces/IEvent";
import mongoose from "mongoose";

const EventReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    content: {
      type: String
    },
    rating: {
      type: Number
      //between 1-5
    },
    postedBy: {
      //add ref to user instance
    },
    eventRef: {
      //ref to event instance
    }
  },
  { timestamps: true }
);

export default mongoose.model<IEventReview & mongoose.Document>(
  "EventReview",
  EventReviewSchema
);
