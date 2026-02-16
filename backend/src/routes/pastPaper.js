import { Router } from "express";
import * as pastPaperController from "../controllers/pastPaperController.js";

const router = Router();

router.post("/list", pastPaperController.getList);
router.post("/getPaper", pastPaperController.getPaper);
router.post("/answerSubmit", pastPaperController.answerSubmit);

export default router;
