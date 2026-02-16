import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import coursesRoutes from "./routes/courses.js";
import quizRoutes from "./routes/quiz.js";
import pastPaperRoutes from "./routes/pastPaper.js";
import subjectiveQuestionRoutes from "./routes/subjectiveQuestion.js";
import activityRoutes from "./routes/activity.js";
import chatRoutes from "./routes/chat.js";
import analyticsRoutes from "./routes/analytics.js";
import uploadRoutes from "./routes/upload.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/pastpaper", pastPaperRoutes);
app.use("/api/subjective", subjectiveQuestionRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

export default app;
