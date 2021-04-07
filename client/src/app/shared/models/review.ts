import PartialUserProfileDTO from './partial-user-dto';

interface Review {
  _id?: string;
  title: string;
  rating: number;
  content: string;
  postedBy: PartialUserProfileDTO;
  postDate: Date;
}

export default Review;
