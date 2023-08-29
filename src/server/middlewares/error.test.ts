import { type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError";
import { endpointNotFound, generalErrorHandler } from "./error";

const next = jest.fn();
const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given a endpointNotFound error middleware", () => {
  describe("When the passed next functions is calles", () => {
    test("Then it should call the passed next function with a custom error with status code 404", () => {
      const customError = new CustomError(
        "Endpoint not found",
        404,
        "Endpoint not found",
      );

      endpointNotFound(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

describe("Given a generalErrorhandler error middleware", () => {
  describe("When it receives a response and an error with status code 404", () => {
    const generalError = new CustomError(
      "Endpoint not found",
      404,
      "Endpoint not found",
    );

    test("Then it should call the response status method with error status code 404", () => {
      generalErrorHandler(generalError, req as Request, res as Response, next);
      expect(res.status).toBeCalledWith(generalError.statusCode);
    });

    test("Then it should call the json method response with the message 'Endpoint not found'", () => {
      expect(res.json).toBeCalledWith({ error: generalError.message });
    });
  });

  describe("When it receives a response error without status code", () => {
    test("Then it should call his status method with status code 500", () => {
      const generalError = new Error();
      const predefinedStatusCode = 500;
      generalErrorHandler(
        generalError as CustomError,
        req as Request,
        res as Response,
        next,
      );

      expect(res.status).toBeCalledWith(predefinedStatusCode);
    });
  });
});
