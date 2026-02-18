/**
 * Subjective answer evaluation – uses OpenAI SDK. Returns { marks, feedback }.
 */
import { openai } from "../lib/openai.js";

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
    feedback: `Answer length considered. You scored ${marks}/${maxMarks}. (Add OPENAI_API_KEY in backend for AI grading.)`,
  };
}

function parseEvaluationResponse(content, maxMarks) {
  const match = (content || "").match(/\{[\s\S]*\}/);
  if (match) {
    const parsed = JSON.parse(match[0]);
    const marks = Math.min(maxMarks, Math.max(0, Number(parsed.marks) || 0));
    const feedback = typeof parsed.feedback === "string" ? parsed.feedback : "Evaluated.";
    return { marks, feedback };
  }
  return null;
}

export async function evaluateAnswer(questionText, userAnswer, maxMarks) {
  if (!openai) return mockEvaluate(questionText, userAnswer, maxMarks);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an examiner for Virtual University. Evaluate the student's answer and give marks out of ${maxMarks}. Reply in JSON only: {"marks": number (0-${maxMarks}), "feedback": "one or two sentences"}. Be fair: partial credit for partially correct answers.`,
        },
        {
          role: "user",
          content: `Question: ${questionText}\n\nStudent's answer: ${(userAnswer || "").trim() || "(No answer)"}\n\nRespond with JSON: {"marks": number, "feedback": "string"}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 200,
    });
    const content = completion?.choices?.[0]?.message?.content?.trim() || "";
    const result = parseEvaluationResponse(content, maxMarks);
    if (result) return result;
  } catch (e) {
    console.error("AI evaluate (OpenAI) error:", e.message);
  }
  return mockEvaluate(questionText, userAnswer, maxMarks);
}
