import express from "express";
import {
  getRobots,
  getRobotById,
  deleteRobotById,
} from "../controllers/robotsController.js";
import routes from "./routes.js";

const { getRobotsRoute, robotByIdRoute, deleteByIdRoute } = routes;

// eslint-disable-next-line new-cap
const robotRouter = express.Router();

robotRouter.get(getRobotsRoute, getRobots);
robotRouter.get(robotByIdRoute, getRobotById);
robotRouter.delete(deleteByIdRoute, deleteRobotById);

export default robotRouter;
