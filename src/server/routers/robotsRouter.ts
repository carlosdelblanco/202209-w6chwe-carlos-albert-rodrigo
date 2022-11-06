import express from "express";
import { getRobots, getRobotById } from "../controllers/robotsController.js";
import routes from "./routes.js";

const { getRobotsRoute, robotByIdRoute } = routes;

// eslint-disable-next-line new-cap
const robotRouter = express.Router();

robotRouter.get(getRobotsRoute, getRobots);
robotRouter.get(robotByIdRoute, getRobotById);

export default robotRouter;
