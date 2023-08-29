import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { endpointNotFound, generalErrorHandler } from "../middlewares/error.js";
import { robotsRoutes } from "./robotsRouters/robotsRouters.js";

export const app = express();

const corsOptions = {
  origin: true,
  methods: "GET,POST",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use("/robots", robotsRoutes);

app.use(endpointNotFound);
app.use(generalErrorHandler);

export default app;
