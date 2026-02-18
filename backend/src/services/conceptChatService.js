/**
 * Quiz concept chat – uses OpenAI SDK. For "Reading material & Chat" in quiz.
 */
import { openai, VU_SPECIALIST_PROMPT } from "../lib/openai.js";

const MOCK_REPLY =
  "Add OPENAI_API_KEY in the backend .env to get AI-powered answers. Use the reading material above and your notes for deeper study.";

export async function conceptChat(questionText, referenceParagraph, userMessage) {
  const context = [questionText, referenceParagraph].filter(Boolean).join("\n\nReading material:\n");
  const msg = (userMessage || "").trim();
  if (!msg) return { reply: "Please type a question about this concept." };

  if (!openai) return { reply: MOCK_REPLY };

  const systemPrompt = `${VU_SPECIALIST_PROMPT} Answer the student's question briefly and clearly based on the given question and reading material. Keep answers concise (2–4 sentences) unless they ask for more detail.`;
  const userContent = `Context:\n${context}\n\nStudent question: ${msg}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
      temperature: 0.5,
      max_tokens: 300,
    });
    const reply = completion?.choices?.[0]?.message?.content?.trim() || null;
    return { reply: reply || MOCK_REPLY };
  } catch (e) {
    console.error("Concept chat (OpenAI) error:", e.message);
    return { reply: MOCK_REPLY };
  }
}
