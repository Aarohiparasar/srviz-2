import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
    {
        leadId: { type: mongoose.Schema.Types.ObjectId, ref: "Lead", required: true },
        packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },

        basePrice: { type: Number, required: true },
        adjustments: {
            seasonal: { type: Number, default: 0 },
            earlyBird: { type: Number, default: 0 },
            lastMinute: { type: Number, default: 0 },
            group: { type: Number, default: 0 },
            weekend: { type: Number, default: 0 },
        },
        finalPrice: { type: Number, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Quote", quoteSchema);
