import { Schema, model } from "mongoose";
import { type RobotStructure } from "../types.js";

const robotSchema = new Schema<RobotStructure>({
  name: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
  endurance: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Robot = model("Robot", robotSchema, "robositos");

export default Robot;
