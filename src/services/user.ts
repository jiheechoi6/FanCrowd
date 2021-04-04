import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  IUser,
  INewUserInputDTO,
  IUpdateUserDTO,
  IResetPasswordEmailDTO,
  IResetPasswordInputDTO,
  IRequestUser
} from "../interfaces/IUser";
import User from "../models/user";
import Event from "../models/event";
import FandomMember from "../models/fandom-member";
import ErrorService from "./error";
import crypto from "crypto";
import EmailService from "./email";
import config from "../config";

export default class UserService {
  /**
   * helper function for authentication
   * @param userInputDTO new user
   */

  public async SignUp(userInputDTO: INewUserInputDTO) {
    const usernameCheck = await User.findOne({ username: userInputDTO.username });

    if (usernameCheck) {
      throw new ErrorService(
        "UnauthorizedError",
        "Username is already taken"
      );
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

    // automatically log in user that signed up
    const token = jwt.sign(user, config.jwtSecret);

    return { user, token: "JWT " + token };
  }

  public async SignIn(username: string = "", password: string = "") {
    const userRecord = await User.findOne({ username: username });

    if (!userRecord) {
      throw new ErrorService(
        "UnauthorizedError",
        "Username is incorrect"
      );
    }

    const isPasswordValid = await bcrypt.compare(password, userRecord.password);

    if (!isPasswordValid) {
      throw new ErrorService(
        "UnauthorizedError",
        "Password is incorrect"
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

    const emailService = new EmailService();
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
    await emailService.sendEmail({
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
  }
}
