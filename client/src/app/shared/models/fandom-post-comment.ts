import { IUserLikeOnlyUser, IUserPostedBy } from './fandom-post';

interface FandomPostComment {
  _id?: string;
  title: string;
  content: string;
  postedBy?: IUserPostedBy;
  fandomPost: string;
  createdAt?: Date;
  likes?: IUserLikeOnlyUser[];
  dislikes?: IUserLikeOnlyUser[];
}

export default FandomPostComment;
