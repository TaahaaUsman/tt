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
import paymentRoutes from "./routes/payment.js";
import * as paymentController from "./controllers/paymentController.js";

const app = express();

// Allow frontend from localhost or 127.0.0.1 (browser treats them as different origins)
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, origin);
      return callback(null, allowedOrigins[0] || "http://localhost:5173");
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

// Stripe webhook needs raw body for signature verification (must be before express.json())
app.post("/api/payment/webhook", express.raw({ type: "application/json" }), paymentController.webhook);

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
app.use("/api/payment", paymentRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

export default app;
