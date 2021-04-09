import { IUserPostedBy } from './fandom-post';

interface Review {
  _id?: string;
  title: string;
  rating: number;
  content: string;
  postedBy: IUserPostedBy;
  createdAt: Date;
}

export interface IEventReviewSummary {
  avgRating: number;
  numOfEachRating: {
    [key: string]: number;
  };
}

export default Review;
