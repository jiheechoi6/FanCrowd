import mongoose from "mongoose";
import { IFandom, IPopulatedFandomCategory } from "./IFandom";
import { IUser, IUserPostedBy } from "./IUser";

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

export interface IEventSummary {
  _id: mongoose.Types._ObjectId;
  name: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  totalAttendance: number;
}

export interface IPopulatedEventDTO {
  _id: mongoose.Types._ObjectId;
  name: string;
  description: string;
  location: string;
  postedBy: IUserPostedBy;
  startDate: Date;
  endDate: Date;
  fandom: IPopulatedFandomCategory;
  totalAttendance: number;
}

export interface IEventFilter {
  _id?: mongoose.Types._ObjectId;
  name?: string;
  description?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  fandom?: mongoose.Types._ObjectId;
  postedBy?: mongoose.Types._ObjectId;
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
  postedBy: mongoose.Types._ObjectId;
  event: mongoose.Types._ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface INewEventReviewInputDTO {
  title: string;
  content: string;
  rating: number;
  event: mongoose.Types._ObjectId;
}

export interface IUpdateEventDTO {
  name?: string;
  description?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  fandom?: string;
}

export interface IUpdateEventReviewDTO {
  title: string;
  content: string;
  rating: number;
  event: string;
}
