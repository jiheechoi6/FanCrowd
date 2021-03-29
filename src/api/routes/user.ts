import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import {
  IUser,
  INewUserInputDTO,
} from "../../interfaces/IUser";
import UserSchema from "../../models/user";
import { isValidObjectId } from "mongoose";
import ErrorService from "../../services/error";
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
  route.get("", async (req, res, next) =>{
    try {
      const users: IUser[] = await UserSchema.find(
        {}
      );
      res.status(200).send(users);
    } catch (err) {
      return next(err);
    }
  });

  /**
   * path: /api/users/username
   * method: GET
   * body: None
   * params: None
   * description: get a user with username
   */
  route.get("/:username", async (req, res, next) => {
    try {
      const username = req.params.username;
      const userFound = await UserSchema.findOne({
        username: username
      });

      if (!userFound) {
        throw new ErrorService(
          "NotFoundError",
          `User with username ${username} does not exist`
        );
      }

      res.status(200).send(userFound);
    } catch (err) {
      return next(err);
    }
  });
};
