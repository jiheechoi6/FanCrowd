import config from "../config";
import bcrypt from "bcryptjs";
import { IUser, INewUserInputDTO } from "../interfaces/IUser";
import UserModel from "../models/user";

export default class UserService {

  /**
   * helper function for authentication
   * @param userInputDTO new user
   */
  public async SignUp(
    userInputDTO: INewUserInputDTO
  ): Promise<{ user: IUser }> {
    try {
      const salt = await bcrypt.genSalt(10);
      userInputDTO.password = await bcrypt.hash(userInputDTO.password, salt);

      const newUser: INewUserInputDTO = {
        ...userInputDTO
      }

      const userRecord = await UserModel.create(newUser);

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
