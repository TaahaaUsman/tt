import * as subjectiveQuestionService from "../services/subjectiveQuestionService.js";

export async function getQuestions(req, res) {
  try {
    const { courseId } = req.body || {};
    const result = await subjectiveQuestionService.getQuestions(courseId);
    if (result.error) return res.status(result.status).json({ error: result.error });
    res.status(200).json({ success: true, questions: result.questions });
  } catch (error) {
    console.error("❌ Error fetching subjective questions:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
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
