import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    imageUrl: { type: String, trim: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

categorySchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "categoryId",
});

export default mongoose.models.Category || mongoose.model("Category", categorySchema);
