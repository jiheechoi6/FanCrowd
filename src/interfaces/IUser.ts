import { IEvent } from "./IEvent";
import { IFandom, IFandomComment, IFandomPost } from "./IFandom";

export interface IUser {
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
  _id: string;
  user: IUser;
  event: IEvent;
}

export interface IFandomMember {
  _id: string;
  user: IUser;
  fandom: IFandom;
}

export interface IUserLike {
  _id: string;
  user: IUser;
  fandomPost?: IFandomPost;
  fandomComment: IFandomComment;
  isLike: boolean;
}
