import mongoose from "mongoose";

const subjectiveQuestionSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    type: { type: String, enum: ["short", "long"], required: true },
    questionText: { type: String, required: true },
    maxMarks: { type: Number, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

subjectiveQuestionSchema.index({ courseId: 1, order: 1 });

export default mongoose.models.SubjectiveQuestion ||
  mongoose.model("SubjectiveQuestion", subjectiveQuestionSchema);
