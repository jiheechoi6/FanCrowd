import Category from "./category";

interface FandomEvent {
  _id?: number;
  category: Category;
  name: string;
  backgroundURL: string;
  createdAt: Date;
}

export default FandomEvent;
