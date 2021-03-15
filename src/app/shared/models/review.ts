import PartialUserDTO from './partial-user-dto';

interface Review {
  id?: number;
  title: string;
  rating: number;
  content: string;
  postedBy: PartialUserDTO;
  postDate: Date;
}

export default Review;
