import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import deviceRoutes from "./routes/deviceRoutes.js";
import ruleRoutes from "./routes/ruleRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/devices", deviceRoutes);
app.use("/rules", ruleRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});