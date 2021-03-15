import express from "express";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";

export default async ({ expressApp }: { expressApp: express.Application }) => {
  await mongooseLoader();

  expressLoader({ app: expressApp });
};
