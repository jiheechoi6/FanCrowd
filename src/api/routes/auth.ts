import { Router, Request, Response, NextFunction } from "express";
import { INewUserInputDTO } from "../../interfaces/IUser";
import UserService from "../../services/user";
import passport from "passport";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  /**
   * path: /api/auth/signup
   * method: POST
   * body:
   *  {
   *    fullName: string,
   *    email: string,
   *    username: string,
   *    password: string
   *  }
   * params: None
   * description: registers a new user
   */
  route.post(
    "/signup",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userService = new UserService();
        const signedUpUser = await userService.SignUp(
          req.body as INewUserInputDTO
        );
        res.status(200).send(signedUpUser);
      } catch (err) {
        return next(err);
      }
    }
  );

  /**
   * path: /api/auth/signin
   * method: POST
   * body:
   *  {
   *    username: string,
   *    password: string
   *  }
   * params: None
   * description: sign in a user
   */
  route.post(
    "/signin",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username, password } = req.body;
        const userService = new UserService();
        const tokenAndUser = await userService.SignIn(username, password);
        res.status(200).send(tokenAndUser);
      } catch (err) {
        return next(err);
      }
    }
  );

  /**
   * path: /api/auth/currentUser
   * method: GET
   * header: Authorization: token
   * body: None
   * params: None
   * description: get information for current user logged in
   */
  route.get(
    "/currentUser",
    passport.authenticate("jwt", { session: false, failWithError: true }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        res.status(200).send(req.user);
      } catch (err) {
        return next(err);
      }
    }
  );
};
