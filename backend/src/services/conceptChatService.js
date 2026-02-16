const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

function mockReply(questionText, referenceParagraph, userMessage) {
  return (
    "This is a demo reply. Add OPENAI_API_KEY in the backend to get AI-powered answers. " +
    "You asked about the concept related to this MCQ — use the reading material above and your course notes for deeper study."
  );
}

export async function conceptChat(questionText, referenceParagraph, userMessage) {
  const context = [questionText, referenceParagraph].filter(Boolean).join("\n\nReading material:\n");
  const msg = (userMessage || "").trim();
  if (!msg) return { reply: "Please type a question about this concept." };

  if (!OPENAI_API_KEY) return { reply: mockReply(questionText, referenceParagraph, msg) };

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful tutor. Answer the student's question briefly and clearly based on the given question and reading material. Keep answers concise (2–4 sentences) unless they ask for more detail.",
          },
          {
            role: "user",
            content: `Context:\n${context}\n\nStudent question: ${msg}`,
          },
        ],
        temperature: 0.5,
        max_tokens: 300,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenAI conceptChat error:", res.status, err);
      return { reply: mockReply(questionText, referenceParagraph, msg) };
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || mockReply(questionText, referenceParagraph, msg);
    return { reply };
  } catch (e) {
    console.error("Concept chat error:", e);
    return { reply: mockReply(questionText, referenceParagraph, msg) };
  }
}
