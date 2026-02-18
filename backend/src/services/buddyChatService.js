/**
 * Buddy AI – general chat using OpenAI SDK. Used by the floating chat widget.
 */
import { openai, VU_SPECIALIST_PROMPT } from "../lib/openai.js";

const DEMO_REPLY =
  "Add OPENAI_API_KEY in the backend .env to enable Buddy AI. I can then help with Virtual University papers, material, and more.";

export async function getBuddyReply(userMessage) {
  const msg = (userMessage || "").trim();
  if (!msg) return DEMO_REPLY;
  if (!openai) return DEMO_REPLY;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `${VU_SPECIALIST_PROMPT} Respond in a helpful, clear way. You can use markdown (bold, lists, code blocks) when useful. Keep replies concise unless the user asks for more.`,
        },
        { role: "user", content: msg },
      ],
      temperature: 0.6,
      max_tokens: 512,
    });
    const reply = completion?.choices?.[0]?.message?.content?.trim() || null;
    return reply || DEMO_REPLY;
  } catch (e) {
    console.error("Buddy AI (OpenAI) error:", e.message);
    return DEMO_REPLY;
  }
}
