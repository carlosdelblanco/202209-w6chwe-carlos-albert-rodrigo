import chalk from "chalk";
import express from "express";
import morgan from "morgan";
import debugCreator from "debug";
import routes from "./routers/routes.js";
import { endPointUnknown } from "./middleware/errors.js";
import robotRouter from "./routers/robotsRouter.js";
import cors from "cors";

const app = express();
const { robots } = routes;

const debug = debugCreator(`${process.env.DEBUG}`);

const startServer = (port: number) => {
  app.listen(port, () => {
    debug(chalk.blue("It's alive"));
  });
};

app.use(morgan("dev"));

app.use(express.json());

app.use("/robots", cors(), robotRouter);

app.use(robots, robotRouter);

app.use(endPointUnknown);

export default startServer;
