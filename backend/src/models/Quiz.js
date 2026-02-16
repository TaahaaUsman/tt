import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  index: { type: Number, required: true },
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctOptionIndex: { type: Number, required: true },
  referenceParagraph: { type: String, default: "" },
});

const quizSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    type: { type: String, enum: ["midterm", "finalterm"], required: true },
    visitedBy: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, visitedAt: { type: Date, default: Date.now } }],
    visitCount: { type: Number, default: 0 },
    questions: [questionSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);
