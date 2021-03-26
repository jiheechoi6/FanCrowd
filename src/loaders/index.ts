import express from "express";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import dbDateLoader from "./seed-db";

export default async ({ expressApp }: { expressApp: express.Application }) => {
  await mongooseLoader();
  await dbDateLoader();

  expressLoader({ app: expressApp });
};
