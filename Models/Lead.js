import mongoose from "mongoose";
import { EventModel } from "./eventModel.js";


const statusEnum = [
  "New",
  "Contacted",
  "Quote Sent",
  "Interested",
  "Closed Won",
  "Closed Lost"
];

// Status history schema
const statusHistorySchema = new mongoose.Schema({
  status: { type: String, enum: statusEnum, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Lead schema
const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    travellers: { type: Number, default: 1 },

    // Current status
    status: {
      type: String,
      enum: statusEnum,
      default: "New"
    },

    // History records
    statusHistory: [statusHistorySchema]
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
