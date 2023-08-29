import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import Robot from "../../../database/models/Robot.js";
import { type RobotStructure } from "../../../types.js";
import { robotsMocks } from "../../mocks/mocks.js";
import app from "../index.js";

let server: MongoMemoryServer;

beforeEach(async () => {
  server = await MongoMemoryServer.create();
  const dbUrl = server.getUri();
  await connectToDatabase(dbUrl);
  await Robot.create(robotsMocks);
});

afterEach(async () => {
  await mongoose.connection.close();
  await server.stop();
});

const path = "/robots";

describe("Given a GET '/robots' endpoint ", () => {
  describe("When it receives a request to a database", () => {
    test("Then it should respond with status 200 and the robots 'R2-D2', 'Emilio' and 'Terminator'", async () => {
      const statusCode = 200;

      const response = await request(app).get(path).expect(statusCode);

      const responseBody = response.body as { robots: RobotStructure[] };

      const robotos = await Robot.find().exec();

      robotos.forEach((robot, robotPosition) => {
        expect(responseBody.robots[robotPosition]).toHaveProperty(
          "name",
          robot.name,
        );
      });
    });
  });

  describe("When it receveis a request and the database is down", () => {
    test("Then it should throw an error with status code 500 and the message 'Internal server error'", async () => {
      const errorCode = 500;
      await mongoose.connection.close();
      await request(app).get(path).expect(errorCode);
    });
  });
});
