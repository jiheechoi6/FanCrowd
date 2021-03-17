import { IEvent } from "../interfaces/IEvent";
import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  location: {
    type: String
  },
  postedBy: {
    //add ref to user instance
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  fandomType: {
    //add ref to fandom instance
  }
});

export default mongoose.model<IEvent & mongoose.Document>("Event", EventSchema);
