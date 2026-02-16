import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  index: { type: Number, required: true },
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctOptionIndex: { type: Number, required: true },
});

const pastPaperSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    paperIndex: { type: Number, required: true },
    title: { type: String, default: "" },
    questions: [questionSchema],
  },
  { timestamps: true }
);

pastPaperSchema.index({ courseId: 1, paperIndex: 1 }, { unique: true });

export default mongoose.models.PastPaper || mongoose.model("PastPaper", pastPaperSchema);
