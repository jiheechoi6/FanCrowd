import { IFandom } from "./IFandom";
import { IUser } from "./IUser";

export interface IEvent {
  _id: string;
  name: string;
  description: string;
  location: string;
  postedBy: IUser;
  startDate: Date;
  endDate: Date;
  fandomType: IFandom;
}

export interface INewEventInputDTO {
  name: string;
  description: string;
  location: string;
  postedBy: IUser;
  startDate: Date;
  endDate: Date;
  fandomType: IFandom;
}

export interface IEventReview {
  _id: string;
  title: string;
  content: string;
  rating: number;
  postedBy: IUser;
  eventRef: IEvent;
}

export interface INewEventReviewInputDTO {
  title: string;
  content: string;
  rating: number;
  eventRef: IEvent;
}
