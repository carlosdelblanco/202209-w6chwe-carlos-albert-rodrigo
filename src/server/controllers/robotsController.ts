import debug from "debug";
import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import CustomError from "../../CustomError/CustomError.js";
import Robot from "../../database/models/Robot.js";

export const getRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    debug("Request /Robots");
    const robots = await Robot.find();

    if (!robots?.length) {
      res.status(404).json({ message: "Didn't find robots" });
      return;
    }

    res.status(200).json({ robots });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Server error"
    );
    next(customError);
  }
};

export const getRobotById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug("Request /RobotById");
  const { idRobot } = req.params;
  if (!mongoose.isValidObjectId(idRobot)) {
    res.status(404).json({ message: "Not a valid id Robot" });

    return;
  }

  try {
    const robot = await Robot.findById(idRobot);
    if (!robot) {
      res.status(404).json({ message: "Robot not found" });
      return;
    }

    res.status(200).json({ robot });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Database has problems, try again later"
    );
    next(customError);
  }
};

export const deleteRobotById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { idRobot } = req.params;
  try {
    const robot = await Robot.findById(idRobot);

    await Robot.findByIdAndDelete(idRobot);
    res.status(200).json({ robot });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Database error"
    );

    next(customError);
  }
};
