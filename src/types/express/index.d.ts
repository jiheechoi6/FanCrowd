import { Document, Model } from "mongoose";
import { IUser } from "../../interfaces/IUser";

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
      token: {
        _id: number;
      };
    }
  }

  interface Error {
    status: number;
  }
}
