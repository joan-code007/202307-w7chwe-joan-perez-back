import cors from "cors";
import express from "express";
import {
  createRobotController,
  getRobotsController,
} from "../../controllers/robotsControllers.js";

export const robotsRoutes = express.Router();

const corsGetOptions = {
  origin: true,
  methods: "GET",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const corsPostOptions = {
  origin: true,
  methods: "POST",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

robotsRoutes.get("/", cors(corsGetOptions), getRobotsController);
robotsRoutes.post("/", cors(corsPostOptions), createRobotController);

export default robotsRoutes;
