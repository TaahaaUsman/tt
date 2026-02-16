import { Router } from "express";
import * as quizController from "../controllers/quizController.js";

const router = Router();

router.post("/getQuiz", quizController.getQuiz);
router.post("/conceptChat", quizController.conceptChat);
router.post("/answerSubmit", quizController.answerSubmit);

export default router;
