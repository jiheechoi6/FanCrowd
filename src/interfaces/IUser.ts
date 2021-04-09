import mongoose from "mongoose";
import { IFandomComment, IFandomPost } from "./IFandom";

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
  resetPasswordToken?: IResetPasswordToken;
  isBanned: boolean;
}

export interface ISearchUser {
  _id: mongoose.Types._ObjectId;
  fullName: string;
  username: string;
  profileURL: string;
}

export interface IRequestUser {
  _id: mongoose.Types._ObjectId;
  username: string;
  role: string;
  profileURL: string;
}

export interface IUserPostedBy {
  username: string;
  profileURL: string;
}

export interface INewUserInputDTO {
  fullName: string;
  email: string;
  username: string;
  password: string;
}

export interface IAttendEvent {
  _id: mongoose.Types._ObjectId;
  user: mongoose.Types._ObjectId;
  event: mongoose.Types._ObjectId;
}

export interface IAttendEventFilter {
  _id?: mongoose.Types._ObjectId;
  user?: mongoose.Types._ObjectId;
  event?: mongoose.Types._ObjectId;
}

export interface INewAttendEventDTO {
  user: mongoose.Types._ObjectId;
  event: mongoose.Types._ObjectId | string;
}

export interface IFandomMember {
  _id: mongoose.Types._ObjectId;
  user: mongoose.Types._ObjectId;
  fandom: mongoose.Types._ObjectId;
}

export interface INewFandomMemberInputDTO {
  user: mongoose.Types._ObjectId;
  fandom: mongoose.Types._ObjectId | string;
}

export interface IUserLike {
  _id: mongoose.Types._ObjectId;
  user: mongoose.Types._ObjectId;
  fandomPost?: IFandomPost;
  fandomComment?: IFandomComment;
  isLike: boolean;
}

export interface IUserLikeOnlyUser {
  _id: mongoose.Types._ObjectId;
  user: mongoose.Types._ObjectId;
}

export interface INewUserLikeInputDTO {
  user: mongoose.Types._ObjectId;
  fandomPost?: mongoose.Types._ObjectId;
  fandomComment?: mongoose.Types._ObjectId;
  isLike: boolean;
}

export interface IUpdateUserProfileDTO {
  fullName: string;
  email: string;
  bio: string;
  profileURL: string;
  city: string;
  country: string;
  username: string;
}

export interface IResetPasswordEmailDTO {
  username: string;
  email: string;
}

export interface IResetPasswordToken {
  token: string;
  expiresIn: Date;
}

export interface IResetPasswordInputDTO {
  username: string;
  email: string;
  verificationCode: string;
  password: string;
}
