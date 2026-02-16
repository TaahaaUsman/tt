import { getTokenFromRequest } from "../middlewares/auth.js";
import * as courseService from "../services/courseService.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function sendCors(res, status, data) {
  return res.status(status).set(corsHeaders).json(data);
}

export async function getAllCourses(req, res) {
  try {
    const result = await courseService.getAllCourses();
    if (result.error) return sendCors(res, result.status || 500, { error: result.error });
    sendCors(res, 200, { success: true, data: result.data });
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    sendCors(res, 500, { success: false, message: "Internal Server Error" });
  }
}

export async function getCourseDetails(req, res) {
  try {
    const { courseId } = req.body || {};
    const result = await courseService.getCourseDetails(courseId);
    if (result.error) return sendCors(res, result.status || 401, { error: result.error });
    sendCors(res, 200, { success: true, data: result.data });
  } catch (error) {
    console.error("❌ Error during getting details of course:", error);
    sendCors(res, 500, { success: false, message: "Internal Server Error" });
  }
}

export async function getBookmarked(req, res) {
  try {
    const token = getTokenFromRequest(req);
    const result = await courseService.getBookmarkedCourses(token);
    if (result.error) return sendCors(res, result.status, { error: result.error });
    sendCors(res, 200, { success: true, data: result.data });
  } catch (error) {
    console.error("❌ Error while fetching bookmarked courses:", error);
    sendCors(res, 500, { success: false, message: "Internal Server Error" });
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
