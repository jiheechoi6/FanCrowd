import express from "express";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import seedDb from "./seed-db";

export default async ({ expressApp }: { expressApp: express.Application }) => {
  await mongooseLoader();
  await seedDb();
  await expressLoader({ app: expressApp });
};
