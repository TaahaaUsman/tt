import mongoose from "mongoose";

const analyticsEventSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fingerprint: { type: String, index: true },
    deviceInfo: {
      userAgent: String,
      screenWidth: Number,
      screenHeight: Number,
      language: String,
      timezone: String,
      platform: String,
      deviceMemory: Number,
      hardwareConcurrency: Number,
    },
    type: { type: String, required: true, index: true },
    page: { type: String, default: "" },
    payload: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

analyticsEventSchema.index({ createdAt: 1 });
analyticsEventSchema.index({ type: 1, page: 1 });

export default mongoose.models.AnalyticsEvent || mongoose.model("AnalyticsEvent", analyticsEventSchema);
