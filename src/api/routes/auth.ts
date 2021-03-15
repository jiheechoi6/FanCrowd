import { Router, Request, Response, NextFunction } from "express";
import { IUserInputDTO } from "../../interfaces/IUser";
import UserService from "../../services/user";
import middlewares from "../middlewares";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post(
    "/signup",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userServiceInstance = new UserService();
        const { user } = await userServiceInstance.SignUp(
          req.body as IUserInputDTO
        );
        return res.status(201).json({ user });
      } catch (err) {
        return next(err);
      }
    }
  );

  route.post(
    "/signin",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body;
        const userServiceInstance = new UserService();
        const { user } = await userServiceInstance.SignIn(email, password);
        return res.json({ user }).status(200);
      } catch (err) {
        return next(err);
      }
    }
  );
};
