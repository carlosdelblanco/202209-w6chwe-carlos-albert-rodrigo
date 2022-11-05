import chalk from "chalk";
import express from "express";
import morgan from "morgan";
import debugCreator from "debug";
import robotRouter from "./routers/robotsRouter.js";

const app = express();

const debug = debugCreator(`${process.env.DEBUG}`);

const startServer = (port: number) => {
  app.listen(port, () => {
    debug(chalk.blue("It's alive"));
  });
};

app.use((req, res) => {
  res.status(200).json({ message: "API Robots" });
});

app.use(morgan("dev"));

app.use(express.json());

app.use(robots, robotRouter);

export default startServer;
