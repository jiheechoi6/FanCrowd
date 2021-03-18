import mongoose from "mongoose";
import { IEvent } from "./IEvent";
import { IFandom, IFandomComment, IFandomPost } from "./IFandom";

export interface IUser {
  _id: mongoose.Types._ObjectId;
  fullName: string;
  email: string;
  username: string;
  password: string;
  role: string;
  bio: string;
  profileURL: string;
  city: string;
  country: string;
}

export interface INewUserInputDTO {
  fullName: string;
  email: string;
  username: string;
  password: string;
}

export interface IAttendEvent {
  _id: mongoose.Types._ObjectId;
  user: IUser;
  event: IEvent;
}

export interface INewAttendEventDTO {
  user: IUser;
  event: IEvent;
}

export interface IFandomMember {
  _id: mongoose.Types._ObjectId;
  user: IUser;
  fandom: IFandom;
}

export interface INewFandomMemberInputDTO {
  user: IUser;
  fandom: IFandom;
}

export interface IUserLike {
  _id: mongoose.Types._ObjectId;
  user: IUser;
  fandomPost?: IFandomPost;
  fandomComment?: IFandomComment;
  isLike: boolean;
}

export interface INewUserLikeInputDTO {
  user: IUser;
  fandomPost?: IFandomPost;
  fandomComment?: IFandomComment;
  isLike: boolean;
}
