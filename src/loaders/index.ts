import express from "express";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import dbDataLoader from "./seed-db";

export default async ({ expressApp }: { expressApp: express.Application }) => {
  await mongooseLoader();
  //await dbDataLoader();

  await expressLoader({ app: expressApp });
};
