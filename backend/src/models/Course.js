import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, trim: true, unique: true },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    thumbnailUrl: { type: String },
    /** Intro/overview video URL (e.g. /What_is_Programming,_Really_.mp4 or external). Coursera-style intro. */
    introVideoUrl: { type: String },
    /** Short overview or description for the intro section. */
    introOverview: { type: String },
    voiceNoteUrl: { type: String },
    handoutUrl: { type: String },
    visitedBy: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, visitedAt: { type: Date, default: Date.now } }],
    visitCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
