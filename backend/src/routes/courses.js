import { Router } from "express";
import * as courseController from "../controllers/courseController.js";

const router = Router();

router.get("/", courseController.getAllCourses);
router.post("/getCourseDetails", courseController.getCourseDetails);
router.get("/getBookmarked", courseController.getBookmarked);
router.post("/bookmark", courseController.bookmark);
router.delete("/unbookmark", courseController.unbookmark);

export default router;
