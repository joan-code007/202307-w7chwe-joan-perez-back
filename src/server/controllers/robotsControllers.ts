import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import Robot from "../../database/models/Robot.js";
import { type RobotStructure } from "../../types.js";

export const getRobotsController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const robots = await Robot.find().exec();
    res.status(200).json({ robots });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Internal server error",
      500,
      (error as Error).message,
    );

    next(customError);
  }
};

export const createRobotController = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    RobotStructure
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const robot = req.body;

    const newRobot = await Robot.create(robot);

    res.status(201).json({ robot: newRobot });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Robot can't be created",
      500,
      (error as Error).message,
    );
    next(customError);
  }
};
