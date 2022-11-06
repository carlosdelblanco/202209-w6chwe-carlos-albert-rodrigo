import chalk from "chalk";
import express from "express";
import morgan from "morgan";
import debugCreator from "debug";
import robotRouter from "./routers/robotsRouter.js";
import { getRobots } from "./controllers/robotsController.js";
import { endPointUnknown } from "./middleware/errors.js";

const app = express();

const debug = debugCreator(`${process.env.DEBUG}`);

const startServer = (port: number) => {
  app.listen(port, () => {
    debug(chalk.blue("It's alive"));
  });
};

app.use(morgan("dev"));

app.use(express.json());

app.use(robotRouter, getRobots);

app.use(endPointUnknown);

export default startServer;
