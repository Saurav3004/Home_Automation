import express from "express";
import Rule from "../models/Rule.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const rule = await Rule.create(req.body);
    res.json(rule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  const rules = await Rule.find();
  res.json(rules);
});

export default router;