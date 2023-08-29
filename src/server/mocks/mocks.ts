import mongoose from "mongoose";
import { type RobotStructure } from "../../types";

export const robotsMocks: RobotStructure[] = [
  {
    id: new mongoose.Types.ObjectId().toString(),
    name: "R2-D2",
    speed: 4,
    endurance: 10,
    image:
      "https://i0.wp.com/chubaoyolu.org/wp-content/uploads/2016/05/robot_ai.jpg?resize=800%2C799&ssl=1",
  },
  {
    id: new mongoose.Types.ObjectId().toString(),
    name: "Emiliio",
    speed: 4,
    endurance: 10,
    image:
      "https://i0.wp.com/chubaoyolu.org/wp-content/uploads/2016/05/robot_ai.jpg?resize=800%2C799&ssl=1",
  },
  {
    id: new mongoose.Types.ObjectId().toString(),
    name: "Terminator",
    speed: 4,
    endurance: 8,
    image:
      "https://i0.wp.com/chubaoyolu.org/wp-content/uploads/2016/05/robot_ai.jpg?resize=800%2C799&ssl=1",
  },
];

export const robotMock: Partial<RobotStructure> = {
  name: "Roomba",
  speed: 10,
  endurance: 10,
};
