import PartialUserDTO from "./partialUserDTO";

interface Review {
    id?: number;
    title: string;
    rating: number;
    content: string;
    postedBy: PartialUserDTO;
    postDate: Date;
  }
  
  export default Review;
  