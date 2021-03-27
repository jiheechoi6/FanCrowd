import mongoose from "mongoose";
import { IUser, IUserPostedBy } from "./IUser";

export interface IFandom {
  _id: mongoose.Types._ObjectId;
  name: string;
  backgroundURL: string;
  category: mongoose.Types._ObjectId;
  createdBy: IUser;
  createdAt: Date;
}

export interface INewFandomInputDTO {
  name: string;
  backgroundURL: string;
  category: mongoose.Types._ObjectId;
  createdBy: mongoose.Types._ObjectId;
}

export interface IFandomDTO {
  _id: mongoose.Types._ObjectId;
  name: string;
  backgroundURL: string;
  createdAt: Date;
  category: mongoose.Types._ObjectId;
}

export interface IFandomCategory {
  _id: mongoose.Types._ObjectId;
  name: string;
  backgroundURL: string;
  createdBy: IUser;
}

export interface IFandomCategoryDTO {
  _id: mongoose.Types._ObjectId;
  name: string;
  backgroundURL: string;
}

export interface INewFandomCategoryInputDTO {
  name: string;
  backgroundURL: string;
  createdBy: mongoose.Types._ObjectId;
}

export interface IFandomPost {
  _id: mongoose.Types._ObjectId;
  title: string;
  content: string;
  postedBy: mongoose.Types._ObjectId;
  fandom: mongoose.Types._ObjectId;
  createdAt: Date;
}

export interface IFandomPostDTOWithLikes {
  _id: mongoose.Types._ObjectId;
  title: string;
  content: string;
  postedBy: IUserPostedBy;
  fandom: mongoose.Types._ObjectId;
  createdAt: Date;
  numLikes: number;
  numDislikes: number;
}

export interface INewFandomPostInputDTO {
  title: string;
  content: string;
  fandom: mongoose.Types._ObjectId;
  postedBy: mongoose.Types._ObjectId;
}

export interface IFandomComment {
  _id: mongoose.Types._ObjectId;
  title: string;
  content: string;
  postedBy: IUser;
  fandomPost: IFandomPost;
  createdAt: Date;
}

export interface INewFandomCommentInputDTO {
  title: string;
  content: string;
  fandomPost: mongoose.Types._ObjectId;
}

export interface IFandomCommentDTOWithLikes {
  _id: mongoose.Types._ObjectId;
  title: string;
  content: string;
  postedBy: IUserPostedBy;
  fandomPost: mongoose.Types._ObjectId;
  createdAt: Date;
  numLikes: number;
  numDislikes: number;
}
