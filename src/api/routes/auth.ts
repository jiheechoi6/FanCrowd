import { Router, Request, Response, NextFunction } from "express";
import { INewUserInputDTO } from "../../interfaces/IUser";
import UserService from "../../services/user";
import middlewares from "../middlewares";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  /**
   * path: /api/auth/signup
   * method: post
   * body: 
   *  {
   *    fullName: string,
   *    email: string,
   *    username: string,
   *    password: string
   *  }
   * params: None
   * description: register new user
   */
  route.post(
    "/signup",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userServiceInstance = new UserService();
        const { user } = await userServiceInstance.SignUp(
          req.body as INewUserInputDTO
        );
        return res.status(200).json({ user });
      } catch (err) {
        return next(err);
      }
    }
  );
  
  /**
   * path: /api/auth/signin
   * method: post
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
        const userServiceInstance = new UserService();
        const tokenAndUser = await userServiceInstance.SignIn(username, password);

        res.status(200).json(tokenAndUser);
      } catch (err) {
        return next(err);
      }
    }
  );
};
