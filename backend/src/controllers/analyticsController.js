import * as analyticsService from "../services/analyticsService.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function sendCors(res, status, data) {
  return res.status(status).set(corsHeaders).json(data);
}

export async function listSessions(req, res) {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 100, 200);
    const result = await analyticsService.getSessionsList(limit);
    sendCors(res, 200, { success: true, ...result });
  } catch (error) {
    console.error("❌ Analytics list sessions error:", error);
    sendCors(res, 500, { success: false, message: "Internal Server Error" });
  }
}

export async function getSession(req, res) {
  try {
    const { sessionId } = req.params;
    if (!sessionId) return sendCors(res, 400, { error: "sessionId required" });
    const result = await analyticsService.getSessionDetail(sessionId);
    sendCors(res, 200, { success: true, ...result });
  } catch (error) {
    console.error("❌ Analytics session detail error:", error);
    sendCors(res, 500, { success: false, message: "Internal Server Error" });
  }
}

export async function getStats(req, res) {
  try {
    const result = await analyticsService.getStats();
    sendCors(res, 200, { success: true, ...result });
  } catch (error) {
    console.error("❌ Analytics stats error:", error);
    sendCors(res, 500, { success: false, message: "Internal Server Error" });
  }
}

export async function listUsers(req, res) {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 100, 200);
    const result = await analyticsService.getUsersWithActivity(limit);
    sendCors(res, 200, { success: true, ...result });
  } catch (error) {
    console.error("❌ Analytics list users error:", error);
    sendCors(res, 500, { success: false, message: "Internal Server Error" });
  }
}

export async function getUserActivity(req, res) {
  try {
    const { userId } = req.params;
    if (!userId) return sendCors(res, 400, { error: "userId required" });
    const result = await analyticsService.getUserActivity(userId);
    sendCors(res, 200, { success: true, ...result });
  } catch (error) {
    console.error("❌ Analytics user activity error:", error);
    sendCors(res, 500, { success: false, message: "Internal Server Error" });
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
    if (result.error) return sendCors(res, result.status, { error: result.error });
    sendCors(res, 200, { success: true, count: result.count });
  } catch (error) {
    console.error("❌ Analytics ingest error:", error);
    sendCors(res, 500, { success: false, message: "Internal Server Error" });
  }
}
