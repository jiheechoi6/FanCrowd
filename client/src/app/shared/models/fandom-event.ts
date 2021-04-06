import Category from "./category";

interface FandomEvent {
  _id?: string;
  category: Category;
  name: string;
  backgroundURL: string;
  createdAt: Date;
}

export default FandomEvent;
