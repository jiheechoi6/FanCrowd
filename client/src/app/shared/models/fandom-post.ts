import FandomPostComment from './fandom-post-comment';
import PartialUserDTO from './partial-user-dto';

interface FandomPost {
  postedBy: PartialUserDTO;
  title: string;
  datePosted: Date;
  numLikes: number;
  numDislikes: number;
  content: string;
  comments: FandomPostComment[];
  id?: number;
  fandomId: number;
}

export default FandomPost;
