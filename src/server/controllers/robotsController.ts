import debug from "debug";
import type { NextFunction, Request, Response } from "express";
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
    next(new CustomError((error as Error).message, 500, "Server error"));
  }
};

export default getRobots;
