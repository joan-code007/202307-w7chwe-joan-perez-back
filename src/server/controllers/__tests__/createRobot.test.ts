import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import Robot from "../../../database/models/Robot";
import { type RobotStructure } from "../../../types";
import { robotMock } from "../../mocks/mocks";
import { createRobotController } from "../robotsControllers";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = {};

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnValue(robotMock),
};

const next: NextFunction = jest.fn();

describe("Given a createRobotController controller", () => {
  Robot.create = jest.fn().mockReturnValue(robotMock);

  describe("When it receives a request with the robot 'Roomba' as body request", () => {
    test("Then it should call it's status method with a status code 201", async () => {
      const expectedStatusCode = 201;

      await createRobotController(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          RobotStructure
        >,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call it's json method with the robot 'Roomba'", async () => {
      await createRobotController(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          RobotStructure
        >,
        res as Response,
        next,
      );

      expect(res.json).toBeCalledWith({ robot: robotMock });
    });
  });

  describe("And there is an error", () => {
    test("Then it should call the received next function with a 500 status code and an 'Robot can't be created' error", async () => {
      const error = new CustomError(
        "Robot can't be created",
        500,
        "Robot can't be created",
      );

      Robot.create = jest.fn().mockRejectedValue(error);

      await createRobotController(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          RobotStructure
        >,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
