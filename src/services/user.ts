import config from "../config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser, INewUserInputDTO } from "../interfaces/IUser";
import UserModel from "../models/user";
import Config from "../config/index";

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
    username: string,
    password: string
  ): Promise<{ usernameValid:boolean, pwValid:boolean, token:string,  user: IUser|null }> {
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
        if (pwValid){
          token = await jwt.sign(userRecord.toObject(), Config.secret, {expiresIn: 10800 }); // 3 hours
        }else{
          pwValid = false;
        }
        
        user = userRecord.toObject();
        Reflect.deleteProperty(user, "password");
      }
      return {
        usernameValid: usernameValid,
        pwValid: pwValid,
        token: "JWT" + token,
        user: user
      };
    }catch(err){
      throw new Error("Username or password incorrect");
    }
  }
}
