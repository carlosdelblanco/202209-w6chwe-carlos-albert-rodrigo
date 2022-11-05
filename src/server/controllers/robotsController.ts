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
    res.status(200).json({ robots });
  } catch (error: unknown) {
    next(new CustomError((error as Error).message, 500, "server error"));
  }
};
