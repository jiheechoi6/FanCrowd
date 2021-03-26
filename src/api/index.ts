import { Router } from "express";
import auth from "./routes/auth";
import user from "./routes/user";
import fandom from "./routes/fandom";

export default () => {
  const app = Router();
  auth(app);
  user(app);
  fandom(app);

  return app;
};
