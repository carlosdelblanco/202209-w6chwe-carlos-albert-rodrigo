import "./loadEnvironments.js";
import debugCreator from "debug";
import express from "express";

const debug = debugCreator("http");

const app = express();
const port = process.env.PORT;

const server = app.listen(port, () => {
  debug(`server run in port ${port}`);
});

app.use((req, res) => {
  res.status(404).json({ message: "API Robots" });
});

server.on("error", Error);
