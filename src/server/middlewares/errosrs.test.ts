import { type Request, type Response } from "express";
import CustomError from "../CustomError/CustomError.js";
import { endpointNotFound } from "./errors.js";

describe("Given a middleware error endopointNotFound", () => {
  describe("when the next function received is called", () => {
    test("Then it should call the passed next function with an error", () => {
      const endpointError = new CustomError(
        "Endpoint not found",
        404,
        "Endpoint not found",
      );

      const next = jest.fn();
      const req: Partial<Request> = {};
      const res: Partial<Response> = {};

      endpointNotFound(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(endpointError);
    });
  });
});
