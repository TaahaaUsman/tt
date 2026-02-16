import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    uploadedFiles: { type: [String], required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Upload || mongoose.model("Upload", uploadSchema);
