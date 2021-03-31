import config from "../config";
import {Strategy, ExtractJwt} from "passport-jwt";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser, INewUserInputDTO, IUpdateUserDTO } from "../interfaces/IUser";
import User from "../models/user";
import Event from "../models/event";
import FandomMember from "../models/fandom-member";
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
      const userRecord = await User.create(newUser);

      if (!userRecord) {
        throw new Error("User cannot be created");
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
      let pwValid = false;
      let token = "";
      let user = null;
      const userRecord = await User.findOne({ username: username });
      if (!userRecord) {
        usernameValid = false;
      }else{
        pwValid = await bcrypt.compare(password, userRecord.password);
        user = userRecord.toObject();
        if (pwValid){
          token = jwt.sign(user, Config.secret, {expiresIn: 10800 }); // 3 hours
          pwValid = true;
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

  public async getUserByUsername(username: string) {
    const user = await User.findOne({username: username});
    if (!user) {
      throw new ErrorService(
        "NotFoundError",
        `User with username ${username} does not exist`
      );
    }

    return user;
  }

  public async deleteUserByUsername(username: string) {
    const user = await this.getUserByUsername(username);
    await user.delete();
  }

  public async updateUser(
    username: string,
    updatedUser: IUpdateUserDTO) {
    const userDoc = await this.getUserByUsername(username);

    userDoc.fullName = updatedUser.fullName || userDoc.fullName;
    userDoc.email = updatedUser.email || userDoc.email;
    userDoc.bio = updatedUser.bio || userDoc.bio;
    userDoc.profileURL = updatedUser.profileURL || userDoc.profileURL;
    userDoc.city = updatedUser.city || userDoc.city;
    userDoc.country = updatedUser.country || userDoc.country;

    const updatedUserDoc = await userDoc.save();
    const user = updatedUserDoc.toObject();

    return user;
  }

  public async getUserEvents(username: string) {
    const user = await this.getUserByUsername(username);
    const events = await Event.find({ postedBy: user._id });

      if (!events) {
        throw new ErrorService(
          "NotFoundError",
          `Events for User with username ${username} do not exist`
        );
      }

    return events;
  }

  public async getUserFandoms(username: string) {
    const user = await this.getUserByUsername(username);
    const fandoms = await FandomMember.find({ user: user._id }).populate("fandom");

    return fandoms;
  }
}
