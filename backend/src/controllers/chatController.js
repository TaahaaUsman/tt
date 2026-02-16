const DEMO_REPLY =
  "This is a demo reply. Soon you'll be able to chat with AI here just like ChatGPT. We'll connect OpenAI and make it fully functional.";

export async function sendMessage(req, res) {
  try {
    const { message } = req.body || {};
    // TODO: Replace with OpenAI chat when ready
    const reply = DEMO_REPLY;
    res.json({ success: true, reply });
  } catch (error) {
    console.error("❌ Chat send error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
