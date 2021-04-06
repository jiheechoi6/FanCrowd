import PartialUserDTO from './partial-user-dto';

interface Review {
  _id?: string;
  title: string;
  rating: number;
  content: string;
  postedBy: PartialUserDTO;
  postDate: Date;
}

export default Review;
