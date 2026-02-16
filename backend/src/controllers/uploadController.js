import { getTokenFromRequest } from "../middlewares/auth.js";
import * as uploadService from "../services/uploadService.js";

export async function createUpload(req, res) {
  try {
    const token = getTokenFromRequest(req);
    const result = await uploadService.createUpload({
      token,
      uploadedFiles: req.body?.uploadedFiles,
      description: req.body?.description,
    });
    if (result.error) return res.status(result.status).json({ error: result.error });
    res.status(result.status || 201).json({ success: result.success, message: result.message });
  } catch (error) {
    console.error("Error uploading query:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
