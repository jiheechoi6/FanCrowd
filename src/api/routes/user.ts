import { Router } from "express";
import {
  IUpdateUserProfileDTO,
  IResetPasswordEmailDTO,
  IResetPasswordInputDTO
} from "../../interfaces/IUser";
import UserService from "../../services/user";
import ErrorService from "../../services/error";
import passport from "passport";
import middlewares from "../middlewares";

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
      const userService = new UserService();
      const users = await userService.getAllUsers();
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
      return next(
        new ErrorService(
          "UnauthorizedError",
          "The verification code is incorrect or has expired"
        )
      );
    }
  });

  /**
   * path: /api/users/:username
   * method: GET
   * body: None
   * params:
   * {
   *    username: string
   * }
   * description: gets a user with username
   */
  route.get("/:username", async (req, res, next) => {
    try {
      const username = req.params.username;
      const userService = new UserService();
      const userDoc = await userService.getUserByUsername(username);

      const user = userDoc.toObject();
      Reflect.deleteProperty(user, "password");
      Reflect.deleteProperty(user, "resetPasswordToken");
      Reflect.deleteProperty(user, "role");
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
   * description: deletes a user
   */
  route.delete(
    "/:username",
    passport.authenticate("jwt", { session: false, failWithError: true }),
    async (req, res, next) => {
      try {
        const username = req.params.username;
        const userService = new UserService();
        await userService.deleteUserByUsername(username, req.user!);
        res.status(200).send();
      } catch (err) {
        return next(err);
      }
    }
  );

  /**
   * path: /api/users/:username/update-ban
   * method: PATCH
   * body: None
   * params:
   * {
   *  username: string
   * }
   * description: toggles user's ban
   */
  route.patch(
    "/:username/update-ban",
    passport.authenticate("jwt", { session: false, failWithError: true }),
    middlewares.isAdmin,
    async (req, res, next) => {
      try {
        const username = req.params.username;
        const userService = new UserService();
        await userService.toggleUserBan(username);
        res.status(200).send();
      } catch (err) {
        return next(err);
      }
    }
  );

  /**
   * path: /api/users/:userId
   * method: PATCH
   * body:
   * {
   *  bio: string,
   *  city: string,
   *  country: string,
   *  email: string,
   *  fullName: string,
   *  profileURL: string,
   *  username: string
   * }
   * params:
   * {
   *  userId: string
   * }
   * description: updates an user
   */
  route.patch(
    "/:userId",
    passport.authenticate("jwt", { session: false, failWithError: true }),
    async (req, res, next) => {
      try {
        const userId = req.params.userId;
        const userService = new UserService();
        const reqBody = req.body as IUpdateUserProfileDTO;
        const user = await userService.updateUser(userId, reqBody, req.user!);
        res.status(200).send(user);
      } catch (err) {
        return next(err);
      }
    }
  );

  /**
   * path: /api/users/:username/events
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
