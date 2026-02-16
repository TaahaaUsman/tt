import db from "../config/db.js";
import Upload from "../models/Upload.js";
import { verifyToken } from "../utils/jwt.js";

export async function createUpload({ token, uploadedFiles, description }) {
  await db();
  if (!token) return { error: "Unauthorized", status: 401 };
  const decoded = verifyToken(token);
  const userId = decoded?.id || decoded?._id;
  if (!userId) return { error: "Unauthorized", status: 401 };
  if (!uploadedFiles || !description) return { error: "Missing fields", status: 400 };
  await Upload.create({ userId, uploadedFiles, description });
  return { success: true, message: "Query submitted successfully", status: 201 };
}
