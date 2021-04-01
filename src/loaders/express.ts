import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "../api";
import config from "../config";
import passport from "passport";

export default async ({ app }: { app: express.Application }) => {
  app.enable("trust proxy");
  app.use(cors());
  app.use(express.json());
  app.use(config.api.prefix, routes());

  // Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());
  await require("../config/passport").default(passport);

  //Catches 404 routes
  app.use((req, res, next) => {
    const err = new Error(
      `${req.method} request to ${req.originalUrl} does not exist!`
    );
    err.status = 404;
    err.name = "NotFoundError";
    next(err);
  });

  //Handles errors in endpoints
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    if (
      err.name === "UnauthorizedError" ||
      err.name === "AuthenticationError"
    ) {
      return res.status(401).send({ message: err.message }).end();
    } else if (err.name === "ValidationError" || err.name === "MongoError") {
      return res.status(400).send({ message: err.message }).end();
    } else if (err.name === "NotFoundError") {
      return res.status(404).send({ message: err.message }).end();
    }
    res.status(500).send({ message: "Internal Server Error" }).end();
  });
};
