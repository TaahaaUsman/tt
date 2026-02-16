/**
 * Evaluates a subjective answer using OpenAI (if API key is set) or a fallback mock.
 * Returns { marks, feedback } where marks is 0 to maxMarks.
 */

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

function mockEvaluate(questionText, userAnswer, maxMarks) {
  const trimmed = (userAnswer || "").trim();
  if (trimmed.length === 0) return { marks: 0, feedback: "No answer provided." };
  const wordCount = trimmed.split(/\s+/).length;
  let marks = 0;
  if (maxMarks === 3) {
    if (wordCount >= 15) marks = 3;
    else if (wordCount >= 8) marks = 2;
    else if (wordCount >= 3) marks = 1;
  } else {
    if (wordCount >= 40) marks = 5;
    else if (wordCount >= 25) marks = 4;
    else if (wordCount >= 15) marks = 3;
    else if (wordCount >= 8) marks = 2;
    else if (wordCount >= 3) marks = 1;
  }
  return {
    marks,
    feedback: `Answer length and relevance considered. You scored ${marks}/${maxMarks}. (Demo evaluation – add OPENAI_API_KEY for AI grading.)`,
  };
}

export async function evaluateAnswer(questionText, userAnswer, maxMarks) {
  if (!OPENAI_API_KEY) return mockEvaluate(questionText, userAnswer, maxMarks);

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
            content: `You are an examiner. Evaluate the student's answer and give marks out of ${maxMarks}. Reply in JSON only: {"marks": number (0-${maxMarks}), "feedback": "one or two sentences"}. Be fair: partial credit for partially correct answers.`,
          },
          {
            role: "user",
            content: `Question: ${questionText}\n\nStudent's answer: ${(userAnswer || "").trim() || "(No answer)"}\n\nRespond with JSON: {"marks": number, "feedback": "string"}`,
          },
        ],
        temperature: 0.3,
        max_tokens: 200,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenAI API error:", res.status, err);
      return mockEvaluate(questionText, userAnswer, maxMarks);
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content?.trim() || "";
    const match = content.match(/\{[\s\S]*\}/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      let marks = Math.min(maxMarks, Math.max(0, Number(parsed.marks) || 0));
      const feedback = typeof parsed.feedback === "string" ? parsed.feedback : "Evaluated.";
      return { marks, feedback };
    }
  } catch (e) {
    console.error("AI evaluate error:", e);
  }
  return mockEvaluate(questionText, userAnswer, maxMarks);
}
