import * as analyticsService from "../services/analyticsService.js";

export async function listSessions(req, res) {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 100, 200);
    const result = await analyticsService.getSessionsList(limit);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error("❌ Analytics list sessions error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSession(req, res) {
  try {
    const { sessionId } = req.params;
    if (!sessionId) return res.status(400).json({ error: "sessionId required" });
    const result = await analyticsService.getSessionDetail(sessionId);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error("❌ Analytics session detail error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getStats(req, res) {
  try {
    const result = await analyticsService.getStats();
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error("❌ Analytics stats error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function listUsers(req, res) {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 100, 200);
    const result = await analyticsService.getUsersWithActivity(limit);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error("❌ Analytics list users error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getUserActivity(req, res) {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "userId required" });
    const result = await analyticsService.getUserActivity(userId);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error("❌ Analytics user activity error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function events(req, res) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "") || req.cookies?.token;
    let userId = null;
    if (token) {
      try {
        const { verifyToken } = await import("../utils/jwt.js");
        const decoded = verifyToken(token);
        userId = decoded?.id || decoded?._id;
      } catch {}
    }
    const body = { ...req.body, userId };
    const result = await analyticsService.ingestEvents(body);
    if (result.error) return res.status(result.status).json({ error: result.error });
    res.status(200).json({ success: true, count: result.count });
  } catch (error) {
    console.error("❌ Analytics ingest error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
