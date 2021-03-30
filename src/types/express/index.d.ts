import { Document, Model } from "mongoose";
import { IUser } from "../../interfaces/IUser";

declare global {
  // namespace Express {
  //   export interface Request {
  //     currentUser: IUser & Document;
  //     token: {
  //       _id: number;
  //     };
  //   }
  // }
  namespace Express {
    export interface User extends IUser{

    }
  }

  interface Error {
    status: number;
  }
}
