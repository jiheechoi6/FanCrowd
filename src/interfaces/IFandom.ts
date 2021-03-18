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
  category: IFandomCategory;
}

export interface IFandomCategory {
  _id: mongoose.Types._ObjectId;
  name: string;
  backgroundURL: string;
  createdBy: IUser;
}

export interface INewFandomCategoryInputDTO {
  name: string;
  backgroundURL: string;
  createdBy: IUser;
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
  fandom: IFandom;
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
  fandomPost: IFandomPost;
}
