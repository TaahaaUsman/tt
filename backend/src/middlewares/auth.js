import { verifyToken } from "../utils/jwt.js";
import User from "../models/User.js";

export const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer "))
    return authHeader.split(" ")[1];
  return req.cookies?.token || null;
};

export const authenticate = async (req, res, next) => {
  const token = getTokenFromRequest(req);
  if (!token)
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  const decoded = verifyToken(token);
  if (!decoded?.id) return res.status(401).json({ error: "Invalid token" });
  const user = await User.findById(decoded.id).select("-passwordHash");
  if (!user) return res.status(404).json({ error: "User not found" });
  req.user = user;
  next();
};
