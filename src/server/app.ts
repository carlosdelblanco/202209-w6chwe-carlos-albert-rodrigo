import chalk from "chalk";
import express from "express";
import morgan from "morgan";
import debugCreator from "debug";

const app = express();

const debug = debugCreator(`${process.env.DEBUG}`);

app.disable("x-powered-by");

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

export default startServer;
