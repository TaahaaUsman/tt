import { Router } from "express";
import * as activityController from "../controllers/activityController.js";

const router = Router();

router.post("/record", activityController.record);
router.get("/stats/short-notes", activityController.getShortNotesStats);

export default router;
