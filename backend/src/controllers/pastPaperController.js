import { getTokenFromRequest } from "../middlewares/auth.js";
import * as pastPaperService from "../services/pastPaperService.js";

export async function getList(req, res) {
  try {
    const { courseId } = req.body || {};
    const result = await pastPaperService.getPastPapersList(courseId);
    if (result.error) return res.status(result.status).json({ error: result.error });
    res.status(200).json({ success: true, papers: result.papers });
  } catch (error) {
    console.error("❌ Error fetching past papers list:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getPaper(req, res) {
  try {
    const { courseId, paperId } = req.body || {};
    const result = await pastPaperService.getPastPaper(courseId, paperId);
    if (result.error) return res.status(result.status).json({ error: result.error });
    res.status(200).json({
      success: true,
      questions: result.questions,
      courseDetails: result.courseDetails,
    });
  } catch (error) {
    console.error("❌ Error fetching past paper:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function answerSubmit(req, res) {
  try {
    const token = getTokenFromRequest(req);
    const result = await pastPaperService.submitPastPaperAnswers({
      token,
      courseId: req.body?.courseId,
      paperId: req.body?.paperId,
      attemptedAnswers: req.body?.attemptedAnswers,
    });
    if (result.error) return res.status(result.status).json({ error: result.error });
    res.json(result);
  } catch (error) {
    console.error("❌ Error submitting past paper answers:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
