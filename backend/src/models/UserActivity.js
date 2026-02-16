import mongoose from "mongoose";

const userActivitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    activityType: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  },
  { timestamps: true }
);

userActivitySchema.index({ userId: 1, activityType: 1, courseId: 1 }, { unique: true });

export default mongoose.models.UserActivity || mongoose.model("UserActivity", userActivitySchema);
