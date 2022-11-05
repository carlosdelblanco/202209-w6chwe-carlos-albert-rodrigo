import { model, Schema } from "mongoose";
// eslint-disable-next-line @typescript-eslint/naming-convention
const RobotSchema = new Schema({
  name: String,
  image: String,
  creation: String,
  resistance: Number,
  speed: Number,
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const Robot = model("Robot", RobotSchema, "robots");

export default Robot;
