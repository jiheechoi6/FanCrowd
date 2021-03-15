import config from "../config";
import bcrypt from "bcryptjs";
import { IUser, IUserInputDTO } from "../interfaces/IUser";
import UserModel from "../models/user";

export default class UserService {
  public async SignUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser }> {
    try {
      const userRecord = await UserModel.create({
        ...userInputDTO
      });

      if (!userRecord) {
        throw new Error("User cannot be created");
      }

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, "password");
      return { user };
    } catch (err) {
      throw err;
    }
  }

  public async SignIn(
    email: string,
    password: string
  ): Promise<{ user: IUser }> {
    const userRecord = await UserModel.findOne({ email });
    if (!userRecord) {
      throw new Error();
    }
    const validPassword = true;
    if (validPassword) {
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, "password");
      return { user };
    } else {
      throw new Error("Username or password incorrect");
    }
  }
}
