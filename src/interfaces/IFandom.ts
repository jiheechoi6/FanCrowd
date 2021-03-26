import mongoose from "mongoose";
import { IUser } from "./IUser";

export interface IFandom {
  _id: mongoose.Types._ObjectId;
  name: string;
  backgroundURL: string;
  category: IFandomCategory;
  createdBy: IUser;
  createdAt: Date;
}

export interface INewFandomInputDTO {
  name: string;
  backgroundURL: string;
  category: mongoose.Types._ObjectId;
}

export interface IFandomDTO {
  _id: mongoose.Types._ObjectId;
  name: string;
  backgroundURL: string;
  createdAt: Date;
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
  postedBy: IUser;
  fandom: IFandom;
  createdAt: Date;
  updatedAt: Date;
}

export interface INewFandomPostInputDTO {
  title: string;
  content: string;
  fandom: mongoose.Types._ObjectId;
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
