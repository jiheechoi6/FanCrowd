import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "../api";
import config from "../config";

export default ({ app }: { app: express.Application }) => {
  app.enable("trust proxy");
  app.use(cors());
  app.use(config.api.prefix, routes());

  //Catches 404 routes
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  //Handles errors in endpoints
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });
};
