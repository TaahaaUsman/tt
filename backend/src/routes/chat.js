import { Router } from "express";
import * as chatController from "../controllers/chatController.js";

const router = Router();

router.post("/send", chatController.sendMessage);

export default router;
