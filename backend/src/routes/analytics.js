import { Router } from "express";
import * as analyticsController from "../controllers/analyticsController.js";

const router = Router();

router.post("/events", analyticsController.events);

export default router;
