import { getTokenFromRequest } from "../middlewares/auth.js";
import * as courseService from "../services/courseService.js";

export async function getAllCourses(req, res) {
  try {
    const result = await courseService.getAllCourses();
    if (result.error) return res.status(result.status || 500).json({ error: result.error });
    res.status(200).json({ success: true, data: result.data });
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getCourseDetails(req, res) {
  try {
    const { courseId } = req.body || {};
    const result = await courseService.getCourseDetails(courseId);
    if (result.error) return res.status(result.status || 401).json({ error: result.error });
    res.status(200).json({ success: true, data: result.data });
  } catch (error) {
    console.error("❌ Error during getting details of course:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getBookmarked(req, res) {
  try {
    const token = getTokenFromRequest(req);
    const result = await courseService.getBookmarkedCourses(token);
    if (result.error) return res.status(result.status).json({ error: result.error });
    res.status(200).json({ success: true, data: result.data });
  } catch (error) {
    console.error("❌ Error while fetching bookmarked courses:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function bookmark(req, res) {
  try {
    const token = getTokenFromRequest(req);
    const result = await courseService.bookmarkCourse(req.body?.courseId, token);
    if (result.error) return res.status(result.status).json({ error: result.error });
    res.json(result);
  } catch (error) {
    console.error("❌ Error bookmarking course:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function unbookmark(req, res) {
  try {
    const token = getTokenFromRequest(req);
    const result = await courseService.unbookmarkCourse(req.body?.courseId, token);
    if (result.error) return res.status(result.status).json({ error: result.error });
    res.json(result);
  } catch (error) {
    console.error("❌ Error during unbookmarking course:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
