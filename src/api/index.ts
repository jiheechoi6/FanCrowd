import { Router } from "express";
import auth from "./routes/auth";
import user from "./routes/user";
import fandom from "./routes/fandom";
import events from "./routes/events";

export default () => {
  const app = Router();
  auth(app);
  user(app);
  fandom(app);
  events(app);

  return app;
};
