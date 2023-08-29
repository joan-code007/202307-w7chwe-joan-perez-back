import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import Robot from "../../../database/models/Robot";
import { robotsMocks } from "../../mocks/mocks";
import { getRobotsController } from "../robotsControllers.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getRobotsController controller ", () => {
  const req: Partial<Request> = {};

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next: NextFunction = jest.fn();

  Robot.find = jest
    .fn()
    .mockReturnValue({ exec: jest.fn().mockResolvedValue(robotsMocks) });

  describe("When it receives a request", () => {
    test("Then it should call its status method with 200", async () => {
      const expectedStatus = 200;

      await getRobotsController(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call it json method with the robots 'R2-D2','Emilio' and Terminator", async () => {
      await getRobotsController(req as Request, res as Response, next);

      expect(res.json).toBeCalledWith({ robots: robotsMocks });
    });
  });

  describe("And there is an error", () => {
    test("Then it should call the received next function with a 500 status code and an 'Internal server error', error", async () => {
      const error = new CustomError(
        "Internal server error",
        500,
        "Internal server error",
      );

      Robot.find = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockRejectedValue(error) });

      await getRobotsController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
