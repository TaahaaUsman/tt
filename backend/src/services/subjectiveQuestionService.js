import db from "../config/db.js";
import SubjectiveQuestion from "../models/SubjectiveQuestion.js";
import Course from "../models/Course.js";
import { evaluateAnswer } from "./aiEvaluateService.js";

const DEMO_SHORT = [
  { questionText: "What is an operating system? List two main functions.", order: 0 },
  { questionText: "Differentiate between multiprocessing and multitasking in one short paragraph.", order: 1 },
  { questionText: "What is the role of a file system in an OS? Give a brief answer.", order: 2 },
];

const DEMO_LONG = [
  { questionText: "Explain the concept of process scheduling. Discuss at least two scheduling algorithms and how they affect system performance.", order: 0 },
  { questionText: "Describe Interprocess Communication (IPC). What are pipes and shared memory? When would you use each?", order: 1 },
];

async function ensureDemoQuestions(courseId) {
  const existing = await SubjectiveQuestion.find({ courseId }).sort({ order: 1 }).lean();
  if (existing.length > 0) return existing;

  const toInsert = [
    ...DEMO_SHORT.map((q) => ({ courseId, type: "short", questionText: q.questionText, maxMarks: 3, order: q.order })),
    ...DEMO_LONG.map((q) => ({ courseId, type: "long", questionText: q.questionText, maxMarks: 5, order: q.order + 10 })),
  ];
  await SubjectiveQuestion.insertMany(toInsert);
  return await SubjectiveQuestion.find({ courseId }).sort({ order: 1 }).lean();
}

export async function getQuestions(courseId) {
  await db();
  if (!courseId) return { error: "courseId is required", status: 400 };
  const course = await Course.findById(courseId).lean();
  if (!course) return { error: "Course not found", status: 404 };
  const questions = await ensureDemoQuestions(courseId);
  return { questions };
}

export async function submitAnswers(courseId, attempts) {
  await db();
  if (!courseId || !Array.isArray(attempts)) return { error: "courseId and attempts array required", status: 400 };

  const questions = await SubjectiveQuestion.find({ courseId }).sort({ order: 1 }).lean();
  if (!questions.length) return { error: "No questions found for this course", status: 404 };

  const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));
  const results = [];
  let totalMarks = 0;
  let totalMax = 0;

  for (const a of attempts) {
    const q = questionMap.get(a.questionId);
    if (!q) {
      results.push({ questionId: a.questionId, marks: 0, maxMarks: 0, feedback: "Question not found." });
      continue;
    }
    totalMax += q.maxMarks;
    const { marks, feedback } = await evaluateAnswer(q.questionText, a.answerText, q.maxMarks);
    totalMarks += marks;
    results.push({
      questionId: q._id,
      questionText: q.questionText,
      type: q.type,
      marks,
      maxMarks: q.maxMarks,
      feedback,
      answerText: a.answerText,
    });
  }

  const percentage = totalMax > 0 ? ((totalMarks / totalMax) * 100).toFixed(1) : 0;
  return {
    results,
    totalMarks,
    totalMax,
    percentage,
  };
}
