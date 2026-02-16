import mongoose from "mongoose";

const pastPaperSubmissionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pastPaperId: { type: mongoose.Schema.Types.ObjectId, ref: "PastPaper", required: true },
    submittedAnswers: [
      { questionIndex: { type: Number, required: true }, selectedOptionIndex: { type: Number, required: true } },
    ],
    score: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.PastPaperSubmission ||
  mongoose.model("PastPaperSubmission", pastPaperSubmissionSchema);
