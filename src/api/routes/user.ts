import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import { IUser, INewUserInputDTO } from "../../interfaces/IUser";
import User from "../../models/user";
import Event from "../../models/event";
import FandomMember from "../../models/fandom-member";
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
  route.get("", async (req, res, next) => {
    try {
      const users: IUser[] = await User.find({});
      res.status(200).send(users);
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
      const user = await User.findOne({
        username: username,
      });

      if (!user) {
        throw new ErrorService(
          "NotFoundError",
          `User with username ${username} does not exist`
        );
      }

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
      const user = await User.findOne({ username: username });

      if (!user) {
        throw new ErrorService(
          "NotFoundError",
          `User with username ${username} does not exist`
        );
      }

      await user.delete();
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
      const userDoc = await User.findOne({ username: username });

      if (!userDoc) {
        throw new ErrorService(
          "NotFoundError",
          `User with username ${username} does not exist`
        );
      }

      userDoc.bio = req.body.bio || userDoc.bio;
      userDoc.city = req.body.city || userDoc.city;
      userDoc.country = req.body.country || userDoc.country;
      userDoc.email = req.body.email || userDoc.email;
      userDoc.fullName = req.body.fullName || userDoc.fullName;
      userDoc.profileURL = req.body.profileURL || userDoc.profileURL;

      const updatedUser = await userDoc.save();
      const user = updatedUser.toObject();

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
      const user = await User.findOne({
        username: username,
      });

      if (!user) {
        throw new ErrorService(
          "NotFoundError",
          `User with username ${username} does not exist`
        );
      }

      const events = await Event.find({ postedBy: user._id });

      if (!events) {
        throw new ErrorService(
          "NotFoundError",
          `Events for User with username ${username} do not exist`
        );
      }

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
   *    fandoms: string
   * }
   * description: get a user's fandoms by username
   */
  route.get("/:username/fandoms", async (req, res, next) => {
    try {
      const username = req.params.username;
      const user = await User.findOne({
        username: username,
      });

      if (!user) {
        throw new ErrorService(
          "NotFoundError",
          `User with username ${username} does not exist`
        );
      }

      const fandoms = await FandomMember.find({ user: user._id });

      if (!fandoms) {
        throw new ErrorService(
          "NotFoundError",
          `Fandoms for User with username ${username} do not exist`
        );
      }

      res.status(200).send(fandoms);
    } catch (err) {
      return next(err);
    }
  });
};
