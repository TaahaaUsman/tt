import { getTokenFromRequest } from "../middlewares/auth.js";
import * as activityService from "../services/activityService.js";

export async function record(req, res) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const { verifyToken } = await import("../utils/jwt.js");
    const decoded = verifyToken(token);
    const userId = decoded?.id || decoded?._id;
    if (!userId) return res.status(401).json({ error: "Invalid token" });

    const { activityType, courseId } = req.body || {};
    const result = await activityService.recordActivity(userId, { activityType, courseId });
    if (result.error) return res.status(result.status).json({ error: result.error });
    res.json({ success: true, stats: result });
  } catch (error) {
    console.error("❌ Error recording activity:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getShortNotesStats(req, res) {
  try {
    const result = await activityService.getShortNotesStats();
    res.json({ success: true, ...result });
  } catch (error) {
    console.error("❌ Error fetching stats:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
