import config from "./config";
import express from "express";

async function startServer() {
  const app = express();

  await require("./loaders").default({ expressApp: app });

  app
    .listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    })
    .on("error", (err) => {
      console.log(`Server failed to start on port ${config.port}`);
      process.exit(1);
    });
}

startServer();
