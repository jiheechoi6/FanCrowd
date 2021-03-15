import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  route.get("/:id", async (req, res) => {
    res.send("Hi from the /users/id endpoint");
  });
};
