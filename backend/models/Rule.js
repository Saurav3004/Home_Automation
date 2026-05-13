import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema(
  {
    name: String,
    trigger_device_id: String,
    trigger_condition: String,
    action_device_id: String,
    action_type: String,
    is_active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Rule", ruleSchema);