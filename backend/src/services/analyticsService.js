import db from "../config/db.js";
import AnalyticsEvent from "../models/AnalyticsEvent.js";

export async function ingestEvents(body) {
  await db();
  const { sessionId, fingerprint, deviceInfo, userId, events } = body || {};
  if (!sessionId || !Array.isArray(events) || events.length === 0) {
    return { error: "sessionId and events array required", status: 400 };
  }

  const docs = events.map((ev) => ({
    sessionId,
    userId: userId || undefined,
    fingerprint: fingerprint || undefined,
    deviceInfo: deviceInfo || undefined,
    type: ev.type || "unknown",
    page: ev.page != null ? String(ev.page) : "",
    payload: ev.payload != null ? ev.payload : {},
  }));

  await AnalyticsEvent.insertMany(docs);
  return { ok: true, count: docs.length };
}
