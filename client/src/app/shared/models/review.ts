import { IUserPostedBy } from './fandom-post';

interface Review {
  _id?: string;
  title: string;
  rating: number;
  content: string;
  postedBy: IUserPostedBy;
  createdAt: Date;
}

export default Review;
