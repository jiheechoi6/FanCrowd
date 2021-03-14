import { Request, Response } from "express";
import User from "./models/user";

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.get("/", async (req: Request, res: Response) => {
  const newUser = await User.create({
    name: "chandra panta chhetri",
    email: "pantach@gmail.com",
    password: "changing"
  });

  res.send({ newUser });
});

app.listen(port, () => console.log(`server is listening on ${port}`));
