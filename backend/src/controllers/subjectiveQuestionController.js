import * as subjectiveQuestionService from "../services/subjectiveQuestionService.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function sendCors(res, status, data) {
  return res.status(status).set(corsHeaders).json(data);
}

export async function getQuestions(req, res) {
  try {
    const { courseId } = req.body || {};
    const result = await subjectiveQuestionService.getQuestions(courseId);
    if (result.error) return sendCors(res, result.status, { error: result.error });
    sendCors(res, 200, { success: true, questions: result.questions });
  } catch (error) {
    console.error("❌ Error fetching subjective questions:", error);
    sendCors(res, 500, { success: false, message: "Internal Server Error" });
  }
}

export async function submitAnswers(req, res) {
  try {
    const { courseId, attempts } = req.body || {};
    const result = await subjectiveQuestionService.submitAnswers(courseId, attempts);
    if (result.error) return res.status(result.status).json({ error: result.error });
    res.json({ success: true, ...result });
  } catch (error) {
    console.error("❌ Error submitting answers:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
