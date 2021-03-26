import mongoose from "mongoose";
import { IFandom } from "./IFandom";
import { IUser } from "./IUser";

export interface IEvent {
  _id: mongoose.Types._ObjectId;
  name: string;
  description: string;
  location: string;
  postedBy: IUser;
  startDate: Date;
  endDate: Date;
  fandom: IFandom;
}

export interface INewEventInputDTO {
  name: string;
  description: string;
  location: string;
  postedBy: mongoose.Types._ObjectId;
  startDate: Date;
  endDate: Date;
  fandom: mongoose.Types._ObjectId;
}

export interface IEventReview {
  _id: mongoose.Types._ObjectId;
  title: string;
  content: string;
  rating: number;
  postedBy: IUser;
  event: IEvent;
  createdAt: Date;
  updatedAt: Date;
}

export interface INewEventReviewInputDTO {
  title: string;
  content: string;
  rating: number;
  event: mongoose.Types._ObjectId;
}
