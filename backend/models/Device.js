import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    room: String,

    current_state: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: {
      createdAt: false,
      updatedAt: "last_updated"
    }
  }
);

export default mongoose.model("Device", deviceSchema);