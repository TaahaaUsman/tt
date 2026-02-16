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

export async function getSessionsList(limit = 100) {
  await db();
  const sessions = await AnalyticsEvent.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: "$sessionId",
        userId: { $first: "$userId" },
        fingerprint: { $first: "$fingerprint" },
        deviceInfo: { $first: "$deviceInfo" },
        firstSeen: { $min: "$createdAt" },
        lastSeen: { $max: "$createdAt" },
        eventCount: { $sum: 1 },
        pageViews: { $sum: { $cond: [{ $eq: ["$type", "page_view"] }, 1, 0] } },
      },
    },
    { $sort: { lastSeen: -1 } },
    { $limit: limit },
  ]);
  return { sessions };
}

export async function getSessionDetail(sessionId) {
  await db();
  const events = await AnalyticsEvent.find({ sessionId })
    .sort({ createdAt: 1 })
    .lean()
    .select("type page payload deviceInfo fingerprint userId createdAt");
  const first = events[0];
  return {
    sessionId,
    userId: first?.userId,
    fingerprint: first?.fingerprint,
    deviceInfo: first?.deviceInfo,
    events,
  };
}

export async function getStats() {
  await db();
  const [totalEvents, uniqueSessions, pageViewCounts, mousePathCount] = await Promise.all([
    AnalyticsEvent.countDocuments(),
    AnalyticsEvent.distinct("sessionId").then((ids) => ids.length),
    AnalyticsEvent.aggregate([
      { $match: { type: "page_view" } },
      { $group: { _id: "$page", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    AnalyticsEvent.countDocuments({ type: "mouse_path" }),
  ]);
  return {
    totalEvents,
    uniqueSessions,
    pageViewCounts,
    mousePathCount,
  };
}

export async function getUsersWithActivity(limit = 100) {
  await db();
  const users = await AnalyticsEvent.aggregate([
    { $match: { userId: { $exists: true, $ne: null } } },
    {
      $group: {
        _id: "$userId",
        firstSeen: { $min: "$createdAt" },
        lastSeen: { $max: "$createdAt" },
        eventCount: { $sum: 1 },
        pageViews: { $sum: { $cond: [{ $eq: ["$type", "page_view"] }, 1, 0] } },
      },
    },
    { $sort: { lastSeen: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "userDoc",
      },
    },
    { $unwind: { path: "$userDoc", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        userId: "$_id",
        name: "$userDoc.name",
        email: "$userDoc.email",
        firstSeen: 1,
        lastSeen: 1,
        eventCount: 1,
        pageViews: 1,
      },
    },
  ]);
  return { users };
}

export async function getUserActivity(userId) {
  await db();
  const events = await AnalyticsEvent.find({ userId })
    .sort({ createdAt: 1 })
    .lean()
    .select("type page payload deviceInfo sessionId createdAt");
  return { userId, events };
}
