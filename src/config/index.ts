import dotenv from "dotenv";

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error(".env file not found");
}

export default {
  port: parseInt(process.env.PORT || "5000"),
  databaseURL: process.env.MONGODB_URI || "",
  api: {
    prefix: "/api"
  }
};
