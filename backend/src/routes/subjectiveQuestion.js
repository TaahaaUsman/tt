import { Router } from "express";
import * as subjectiveQuestionController from "../controllers/subjectiveQuestionController.js";

const router = Router();

router.post("/getQuestions", subjectiveQuestionController.getQuestions);
router.post("/submitAnswers", subjectiveQuestionController.submitAnswers);

export default router;
