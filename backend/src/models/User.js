import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String },
    profilePictureUrl: { type: String, default: "" },
    status: { type: String, enum: ["active", "disabled", "deleted"], default: "active" },
    provider: { type: String, default: "" },
    subscriptionStatus: { type: String, enum: ["active", "inactive"], default: "inactive" },
    subscriptionType: { type: String, enum: ["6 months", "1 year", ""], default: "" },
    subscriptionStartDate: { type: Date },
    subscriptionEndDate: { type: Date },
    bookmarkedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    role: { type: String, enum: ["user", "superadmin"], default: "user" },
    /** Paid plan: free, pro, ultra_pro. Updated by Stripe webhook. */
    plan: { type: String, enum: ["free", "pro", "ultra_pro"], default: "free" },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationCode: String,
    emailVerificationExpiry: Date,
    lastLoginAt: Date,
    loginAttempts: { type: Number, default: 0 },
    lockedUntil: Date,
    twoFactorEnabled: { type: Boolean, default: false },
    devices: [{ deviceId: String, ip: String, location: String, lastUsed: Date }],
    receiveEmails: { type: Boolean, default: true },
    language: { type: String, default: "en" },
    darkMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
