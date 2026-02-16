import db from "../config/db.js";
import { getTokenFromRequest } from "./auth.js";
import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";

export async function requireSuperAdmin(req, res, next) {
  try {
    await db();
    const token = getTokenFromRequest(req);
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const decoded = verifyToken(token);
    const userId = decoded?.id || decoded?._id;
    if (!userId) return res.status(401).json({ error: "Invalid token" });
    const user = await User.findById(userId).select("role");
    if (!user) return res.status(401).json({ error: "User not found" });
    if (user.role !== "superadmin") return res.status(403).json({ error: "Super admin access required" });
    req.user = user;
    req.userId = userId;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
}
