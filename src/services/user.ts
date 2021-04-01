import config from "../config";
import {Strategy, ExtractJwt} from "passport-jwt";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser, INewUserInputDTO } from "../interfaces/IUser";
import UserModel from "../models/user";
import Config from "../config/index";
import ErrorService from "./error";

export default class UserService {

  /**
   * helper function for authentication
   * @param userInputDTO new user
   */
  public async SignUp(
    userInputDTO: INewUserInputDTO
  ): Promise<{ user: IUser, token: string }> {
    try {
      const salt = await bcrypt.genSalt(10);
      userInputDTO.password = await bcrypt.hash(userInputDTO.password, salt);

      const newUser: INewUserInputDTO = {
        ...userInputDTO
      }

      // const checkUsername = await UserModel.findOne({username:userInputDTO.email});
      // if(checkUsername) throw new Error("Username already exists");

      const userRecord = await UserModel.create(newUser);

      if (!userRecord) {
        throw new ErrorService("Duplicate key", "User cannot be created");
      }

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, "password");

      // automatically log in user that signed up
      const token = jwt.sign(user, Config.secret, {expiresIn: 10800 }); // 3 hours

      return {user: user,
              token: "JWT " + token};
    } catch (err) {
      throw err;
    }
  }

  public async SignIn(
    username: string,
    password: string
  ): Promise<{ usernameValid:boolean, pwValid:boolean, token:string,  user: any}> {
    try{
      let usernameValid = true;
      let pwValid = true;
      let token = "";
      let user = null;
      const userRecord = await UserModel.findOne({ username: username });
      if (!userRecord) {
        usernameValid = false;
      }else{
        pwValid = await bcrypt.compare(password, userRecord.password);
        user = userRecord.toObject();
        if (pwValid){
          token = jwt.sign(user, Config.secret, {expiresIn: 10800 }); // 3 hours 10800
        }

        Reflect.deleteProperty(user, "password");
      }

      return {
        usernameValid: usernameValid,
        pwValid: pwValid,
        token: "JWT " + token,
        user: user
      };
    }catch(err){
      throw new Error("Username or password incorrect");
    }
  }
}
