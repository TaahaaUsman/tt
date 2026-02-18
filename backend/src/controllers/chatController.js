import * as buddyChatService from "../services/buddyChatService.js";

export async function sendMessage(req, res) {
  try {
    const { message } = req.body || {};
    const reply = await buddyChatService.getBuddyReply(message);
    res.json({ success: true, reply });
  } catch (error) {
    console.error("❌ Buddy AI chat error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      reply: "Something went wrong. Please try again.",
    });
  }
}
