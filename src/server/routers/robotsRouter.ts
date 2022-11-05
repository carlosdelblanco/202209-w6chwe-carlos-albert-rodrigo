import express from "express";
import { getRobots } from "../controllers/robotsController.js";
import routes from "./routes.js";

const { getRobotsRoute } = routes;

// eslint-disable-next-line new-cap
const robotRouter = express.Router();

robotRouter.get(getRobotsRoute, getRobots);

export default robotRouter;
