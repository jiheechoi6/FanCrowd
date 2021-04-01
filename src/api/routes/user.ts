import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import {
  IUser,
  IUpdateUserDTO,
  IResetPasswordEmailDTO,
  IResetPasswordInputDTO
} from "../../interfaces/IUser";
import User from "../../models/user";
import UserService from "../../services/user";

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  /**
   * path: /api/users
   * method: GET
   * body: None
   * params: None
   * description: get all users
   */
  route.get("", async (req, res, next) => {
    try {
      const users: IUser[] = await User.find({});
      res.status(200).send(users);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/users/reset-password
   * method: POST
   * body:
   * {
   *  username: string,
   *  email: string
   * }
   * params: None
   * description: sends a reset password email to a user
   */
  route.post("/reset-password-email", async (req, res, next) => {
    try {
      const reqBody = req.body as IResetPasswordEmailDTO;
      const userService = new UserService();
      await userService.sendResetPasswordEmail(reqBody);
      res.status(200).send();
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/users/reset-password
   * method: POST
   * body:
   * {
   *  verificationCode: string,
   *  password: string,
   *  username: string,
   *  email: string
   * }
   * params: None
   * description: resets user's password if verification is correct
   */
  route.post("/reset-password", async (req, res, next) => {
    try {
      const reqBody = req.body as IResetPasswordInputDTO;
      const userService = new UserService();
      await userService.resetPassword(reqBody);

      res.status(200).send();
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/users/username
   * method: GET
   * body: None
   * params:
   * {
   *    username: string
   * }
   * description: get a user with username
   */
  route.get("/:username", async (req, res, next) => {
    try {
      const username = req.params.username;
      const userService = new UserService();
      const user = await userService.getUserByUsername(username);
      res.status(200).send(user);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/users/:username
   * method: DELETE
   * body: None
   * params:
   * {
   *  username: string
   * }
   * description: deletes an event
   */
  route.delete("/:username", async (req, res, next) => {
    try {
      const username = req.params.username;
      const userService = new UserService();
      const user = await userService.deleteUserByUsername(username);
      res.status(200).send();
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/users/:username
   * method: PATCH
   * body:
   * {
   *  bio: string,
   *  city: string,
   *  country: string,
   *  email: string,
   *  fullName: string,
   *  profileURL: string,
   * }
   * params:
   * {
   *  username: string
   * }
   * description: updates an user
   */
  route.patch("/:username", async (req, res, next) => {
    try {
      const username = req.params.username;
      const userService = new UserService();
      const reqBody = req.body as IUpdateUserDTO;

      //Should be passing in req.user.id instead of undefined
      const user = await userService.updateUser(username, reqBody);

      res.status(200).send(user);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/users/username/events
   * method: GET
   * body: None
   * params:
   * {
   *    username: string
   * }
   * description: get a user's events by username
   */
  route.get("/:username/events", async (req, res, next) => {
    try {
      const username = req.params.username;
      const userService = new UserService();
      const events = await userService.getUserEvents(username);

      res.status(200).send(events);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/users/username/fandoms
   * method: GET
   * body: None
   * params:
   * {
   *    username: string
   * }
   * description: get a user's fandoms by username
   */
  route.get("/:username/fandoms", async (req, res, next) => {
    try {
      const username = req.params.username;
      const userService = new UserService();
      const fandoms = await userService.getUserFandoms(username);

      res.status(200).send(fandoms);
    } catch (err) {
      return next(err);
    }
  });
};
