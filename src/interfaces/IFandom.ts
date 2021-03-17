import { IUser } from "./IUser";

export interface IFandom {
  _id: string;
  name: string;
  backgroundURL: string;
  category: IFandomCategory;
}

export interface INewFandomInputDTO {
  name: string;
  backgroundURL: string;
  category: IFandomCategory;
}

export interface IFandomCategory {
  _id: string;
  name: string;
  backgroundURL: string;
}

export interface INewFandomCategoryInputDTO {
  name: string;
  backgroundURL: string;
}

export interface IFandomPost {
  _id: string;
  title: string;
  content: string;
  postedBy: IUser;
  fandomRef: IFandom;
}

export interface INewFandomPostInputDTO {
  title: string;
  content: string;
  fandomRef: IFandom;
}

export interface IFandomComment {
  _id: string;
  title: string;
  content: string;
  postedBy: IUser;
  fandomPostRef: IFandomPost;
}

export interface INewFandomCommentInputDTO {
  title: string;
  content: string;
  fandomPostRef: IFandomPost;
}
