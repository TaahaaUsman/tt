import * as analyticsService from "../services/analyticsService.js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function sendCors(res, status, data) {
  return res.status(status).set(corsHeaders).json(data);
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
