import config from "../config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  INewUserInputDTO,
  IUpdateUserDTO,
  IRequestUser
} from "../interfaces/IUser";
import User from "../models/user";
import Event from "../models/event";
import FandomMember from "../models/fandom-member";
import ErrorService from "./error";

export default class UserService {
  /**
   * helper function for authentication
   * @param userInputDTO new user
   */
  public async SignUp(userInputDTO: INewUserInputDTO) {
    try {
      const salt = await bcrypt.genSalt(10);
      userInputDTO.password = await bcrypt.hash(userInputDTO.password, salt);
      const userRecord = await User.create(userInputDTO);

      const user: IRequestUser = {
        _id: userRecord._id,
        role: userRecord.role,
        username: userRecord.username
      };

      // automatically log in user that signed up
      const token = jwt.sign(user, config.secret);

      return { user, token: "JWT " + token };
    } catch (err) {
      throw err;
    }
  }

  public async SignIn(username: string = "", password: string = "") {
    const userRecord = await User.findOne({ username: username });

    if (!userRecord) {
      throw new ErrorService(
        "UnauthorizedError",
        "Username or password is incorrect"
      );
    }

    const isPasswordValid = await bcrypt.compare(password, userRecord.password);

    if (!isPasswordValid) {
      throw new ErrorService(
        "UnauthorizedError",
        "Username or password is incorrect"
      );
    }

    const user: IRequestUser = {
      _id: userRecord._id,
      role: userRecord.role,
      username: userRecord.username
    };

    const token = jwt.sign(user, config.secret);

    return {
      token: "JWT " + token,
      user
    };
  }

  public async getUserByUsername(username: string) {
    const user = await User.findOne({ username: username });
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

  public async updateUser(username: string, updatedUser: IUpdateUserDTO) {
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
    const fandoms = await FandomMember.find({ user: user._id }).populate(
      "fandom"
    );

    return fandoms;
  }
}
