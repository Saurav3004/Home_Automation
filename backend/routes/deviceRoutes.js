import express from "express";
import Device from "../models/Device.js";
import { evaluateRules } from "../utils/ruleEngine.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

router.post("/:deviceId/control", async (req, res) => {
  try {
    console.log("CONTROL API HIT");

    const { power, value } = req.body;

    console.log(req.body);

    const device = await Device.findById(req.params.deviceId);

    if (!device) {
      return res.status(404).json({
        message: "Device not found"
      });
    }

    const updatedState = {
      ...device.current_state
    };

    if (power) {
      updatedState.power = power;
    }

    if (value !== undefined) {
      updatedState.value = value;
    }

    device.current_state = updatedState;

    await device.save();

    await evaluateRules(
      device._id.toString(),
      updatedState.power
    );

    res.json(device);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message
    });
  }
});

router.post("/simulate-trigger/:deviceId", async (req, res) => {
  try {
    const device = await Device.findById(req.params.deviceId);

    if (!device) {
      return res.status(404).json({
        message: "Device not found"
      });
    }

    device.current_state = {
      ...device.current_state,
      power: req.body.power
    };

    await device.save();

    await evaluateRules(
      device._id.toString(),
      device.current_state.power
    );

    res.json({
      message: "Trigger simulated"
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message
    });
  }
});

export default router;