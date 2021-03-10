import PartialUserDTO from './partialUserDTO';

interface FandomPostComment {
  title: string;
  numLikes: number;
  numDislikes: number;
  postedBy: PartialUserDTO;
  datePosted: Date;
  commentId?: number;
  content: string;
}

export default FandomPostComment;
