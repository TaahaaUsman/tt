import { Router } from "express";
import * as uploadController from "../controllers/uploadController.js";

const router = Router();

router.post("/", uploadController.createUpload);

export default router;
