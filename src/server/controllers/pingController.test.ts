import { type Request, type Response } from "express";
import { pingController } from "./pingController.js";

describe("Given a pingController, controller", () => {
  describe("When the request is sent to '/'", () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should respond with status 200", () => {
      const expectedStatusCode = 200;

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should respond with 'pong' message", () => {
      const message = "pong";

      pingController(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });
});
