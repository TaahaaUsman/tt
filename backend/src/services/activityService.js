import db from "../config/db.js";
import UserActivity from "../models/UserActivity.js";
import User from "../models/User.js";

export async function recordActivity(userId, { activityType, courseId }) {
  await db();
  if (!userId || !activityType) return { error: "userId and activityType required", status: 400 };

  await UserActivity.findOneAndUpdate(
    { userId, activityType, courseId: courseId || null },
    { $set: { userId, activityType, courseId: courseId || null } },
    { upsert: true }
  );

  return await getShortNotesStats();
}

export async function getShortNotesStats() {
  await db();
  const totalUsers = await User.countDocuments();
  const completedCount = await UserActivity.distinct("userId", { activityType: "short_notes_completed" }).then(
    (ids) => ids.length
  );
  const percentage = totalUsers > 0 ? Math.round((completedCount / totalUsers) * 100) : 0;
  return { totalUsers, completedCount, percentage };
}
