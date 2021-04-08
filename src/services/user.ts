import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {
  INewUserInputDTO,
  IUpdateUserProfileDTO,
  IResetPasswordEmailDTO,
  IResetPasswordInputDTO,
  IRequestUser,
  IAttendEventFilter,
  ISearchUser
} from "../interfaces/IUser";
import User from "../models/user";
import FandomMember from "../models/fandom-member";
import ErrorService from "./error";
import crypto from "crypto";
import EmailService from "./email";
import config from "../config";
import Attend from "../models/attend";
import { IEventSummary } from "../interfaces/IEvent";
import GlobalService from "./global";

export default class UserService {
  private static _emailService = new EmailService();
  private static _globalService = new GlobalService();

  public async SignUp(userInputDTO: INewUserInputDTO) {
    const usernameCheck = await User.findOne({
      username: userInputDTO.username
    });

    if (usernameCheck) {
      throw new ErrorService("UnauthorizedError", "Username is already taken");
    }

    const emailCheck = await User.findOne({ email: userInputDTO.email });

    if (emailCheck) {
      throw new ErrorService(
        "UnauthorizedError",
        "An account with this email already exists"
      );
    }

    userInputDTO.password = await this.hashPassword(userInputDTO.password);
    const userRecord = await User.create(userInputDTO);

    const user: IRequestUser = {
      _id: userRecord._id,
      role: userRecord.role,
      username: userRecord.username,
      profileURL: userRecord.profileURL
    };

    const token = jwt.sign(user, config.jwtSecret);
    return { user, token: "JWT " + token };
  }

  public async SignIn(username: string = "", password: string = "") {
    const userRecord = await User.findOne({ username: username });

    if (!userRecord) {
      throw new ErrorService("UnauthorizedError", "Username is incorrect");
    }

    const isPasswordValid = await bcrypt.compare(password, userRecord.password);

    if (!isPasswordValid) {
      throw new ErrorService("UnauthorizedError", "Password is incorrect");
    }

    if (userRecord.isBanned) {
      throw new ErrorService(
        "UnauthorizedError",
        "An admin has banned your account. You can only login after being unbanned"
      );
    }

    const user: IRequestUser = {
      _id: userRecord._id,
      role: userRecord.role,
      username: userRecord.username,
      profileURL: userRecord.profileURL
    };

    const token = jwt.sign(user, config.jwtSecret);

    return {
      token: "JWT " + token,
      user
    };
  }

  public async getAllUsers() {
    const users: ISearchUser[] = await User.find({}).select(
      "fullName username profileURL"
    );
    return users;
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

  public async deleteUserByUsername(username: string, reqUser: IRequestUser) {
    const user = await this.getUserByUsername(username);
    UserService._globalService.hasPermission(
      user._id,
      reqUser,
      `Only the creator or an admin may delete user with username ${username}`
    );
    await user.delete();
  }

  public async getUserById(userId: mongoose.Types._ObjectId | string) {
    UserService._globalService.checkValidObjectId(
      userId,
      `User with id ${userId} does not exist`
    );
    const user = await User.findById(userId);

    if (!user) {
      throw new ErrorService(
        "NotFoundError",
        `User with id ${userId} does not exist`
      );
    }

    return user;
  }

  public async updateUserBan(
    username: string,
    isBanned: boolean,
    reqUser: IRequestUser
  ) {
    const userDoc = await this.getUserByUsername(username);

    if (userDoc.role === "admin") {
      throw new ErrorService(
        "UnauthorizedError",
        "Cannot ban or unban other admins"
      );
    }
    userDoc.isBanned = isBanned || userDoc.isBanned;
    await userDoc.save();
  }

  public async updateUser(
    userId: mongoose.Types._ObjectId | string,
    updatedUser: IUpdateUserProfileDTO,
    reqUser: IRequestUser
  ) {
    const userDoc = await this.getUserById(userId);

    userDoc.fullName = updatedUser.fullName || userDoc.fullName;
    userDoc.email = updatedUser.email || userDoc.email;
    userDoc.bio = updatedUser.bio || userDoc.bio;
    userDoc.profileURL = updatedUser.profileURL || userDoc.profileURL;
    userDoc.city = updatedUser.city || userDoc.city;
    userDoc.country = updatedUser.country || userDoc.country;
    userDoc.username = updatedUser.username || userDoc.username;

    UserService._globalService.hasPermission(
      userDoc._id,
      reqUser,
      `Only the creator or an admin may update the user with id ${userId}`
    );

    const updatedUserDoc = await userDoc.save();
    const user = updatedUserDoc.toObject();
    Reflect.deleteProperty(user, "password");
    Reflect.deleteProperty(user, "resetPasswordToken");
    Reflect.deleteProperty(user, "role");
    Reflect.deleteProperty(user, "isBanned");
    return user;
  }

  public async getUserEventsMatchingFilters(attendFilter: IAttendEventFilter) {
    const events: IEventSummary[] = await Attend.aggregate([
      {
        $match: attendFilter
      },
      {
        $lookup: {
          from: "events",
          as: "event",
          let: {
            eventId: "$event"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$eventId"]
                }
              }
            },
            {
              $lookup: {
                from: "attends",
                as: "attendees",
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$event", "$$eventId"]
                      }
                    }
                  }
                ]
              }
            },
            {
              $project: {
                name: 1,
                description: 1,
                location: 1,
                startDate: 1,
                endDate: 1,
                totalAttendance: {
                  $size: "$attendees"
                }
              }
            }
          ]
        }
      },
      {
        $unwind: "$event"
      },
      {
        $replaceRoot: {
          newRoot: "$event"
        }
      }
    ]);
    return events;
  }

  public async getUserEvents(username: string) {
    const user = await this.getUserByUsername(username);
    const events = await this.getUserEventsMatchingFilters({ user: user._id });
    return events;
  }

  public async getUserFandoms(username: string) {
    const user = await this.getUserByUsername(username);
    const fandoms = await FandomMember.find({ user: user._id }).populate({
      path: "fandom",
      populate: {
        path: "category"
      }
    });

    let fandomList: any[] = [];
    fandoms.forEach((fandom) => {
      fandomList.push(fandom.fandom);
    });

    return fandomList;
  }

  private generateVerificationCode() {
    const randomBytes = crypto.randomBytes(3);
    return parseInt(randomBytes.toString("hex"), 16).toString().substr(0, 6);
  }

  private async hashPassword(password: string) {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new ErrorService(
        "ValidationError",
        "Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number"
      );
    }
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  public async sendResetPasswordEmail(resetEmailInfo: IResetPasswordEmailDTO) {
    if (!resetEmailInfo.email || !resetEmailInfo.username) {
      throw new ErrorService(
        "ValidationError",
        "Username and email is required"
      );
    }

    const user = await User.findOne({
      email: resetEmailInfo.email,
      username: resetEmailInfo.username
    });

    if (!user) {
      return;
    }

    const verificationCode = this.generateVerificationCode();
    const expiresIn = new Date();
    expiresIn.setMinutes(expiresIn.getMinutes() + 10); //token expires in 10 mins

    user.resetPasswordToken!.token = verificationCode;
    user.resetPasswordToken!.expiresIn = expiresIn;

    await user.save();
    await UserService._emailService.sendEmail({
      subject: "FanCrowd - Password Reset Verification Code",
      text: `Here is the verification code needed to reset your password: ${verificationCode}. Please note that it will expire in 10 mins.`,
      to: user.email
    });
  }

  public async resetPassword(resetPasswordInput: IResetPasswordInputDTO) {
    const user = await User.findOne({
      username: resetPasswordInput.username,
      email: resetPasswordInput.email
    });

    if (!user) {
      throw new ErrorService(
        "NotFoundError",
        "User not found with email and username"
      );
    }

    const currentTime = new Date();

    if (
      user.resetPasswordToken?.token !== resetPasswordInput.verificationCode ||
      currentTime > user.resetPasswordToken?.expiresIn
    ) {
      throw new ErrorService(
        "UnauthorizedError",
        "The verification code is incorrect or has expired"
      );
    }

    user.password = await this.hashPassword(resetPasswordInput.password);
    user.resetPasswordToken = undefined;

    await user.save();
    await UserService._emailService.sendEmail({
      subject: "FanCrowd - Password Reset Successful",
      text: `Your password for FanCrowd has been successfully reset`,
      to: user.email
    });
  }
}
