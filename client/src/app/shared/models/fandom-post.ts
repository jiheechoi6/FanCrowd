export interface FandomPost {
  _id?: string;
  title: string;
  content: string;
  postedBy?: IUserPostedBy;
  fandom: string;
  createdAt?: Date;
  numLikes?: IUserLikeOnlyUser[];
  numDislikes?: IUserLikeOnlyUser[];
}

export interface IUserPostedBy {
  username: string;
  profileURL: string;
}

export interface IUserLikeOnlyUser {
  _id: string;
  user: string;
}
