import { getTokenFromRequest } from "../middlewares/auth.js";
import * as quizService from "../services/quizService.js";
import * as conceptChatService from "../services/conceptChatService.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function sendCors(res, status, data) {
  return res.status(status).set(corsHeaders).json(data);
}

export async function getQuiz(req, res) {
  try {
    const { courseId, type } = req.body || {};
    const result = await quizService.getQuiz(courseId, type);
    if (result.error) return sendCors(res, result.status, { error: result.error });
    sendCors(res, 200, { success: true, questions: result.questions, courseDetails: result.courseDetails });
  } catch (error) {
    console.error("❌ Error fetching quiz questions:", error);
    sendCors(res, 500, { success: false, message: "Internal Server Error" });
  }
}

export async function conceptChat(req, res) {
  try {
    const { questionText, referenceParagraph, userMessage } = req.body || {};
    const result = await conceptChatService.conceptChat(questionText, referenceParagraph, userMessage);
    sendCors(res, 200, { success: true, reply: result.reply });
  } catch (error) {
    console.error("❌ Error in concept chat:", error);
    sendCors(res, 500, { success: false, message: "Internal Server Error" });
  }
}

export async function answerSubmit(req, res) {
  try {
    const token = getTokenFromRequest(req);
    const result = await quizService.submitQuizAnswers({
      token,
      courseId: req.body?.courseId,
      type: req.body?.type,
      attemptedAnswers: req.body?.attemptedAnswers,
    });
    if (result.error) return res.status(result.status).json({ error: result.error });
    res.json(result);
  } catch (error) {
    console.error("❌ Error submitting quiz answers:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
