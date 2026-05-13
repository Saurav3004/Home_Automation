import mongoose from "mongoose";
import dotenv from "dotenv";

import Device from "./models/Device.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Device.deleteMany();

await Device.insertMany([
  {
    name: "Living Light",
    type: "light",
    room: "Living Room",
    current_state: {
      power: "OFF"
    }
  },
  {
    name: "Bedroom Fan",
    type: "fan",
    room: "Bedroom",
    current_state: {
      power: "OFF"
    }
  },
  {
    name: "Kitchen Motion Sensor",
    type: "sensor",
    room: "Kitchen",
    current_state: {
      power: "OFF"
    }
  }
]);

console.log("Seed Data Inserted");

process.exit();