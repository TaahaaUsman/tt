import db from "../config/db.js";
import PastPaper from "../models/PastPaper.js";
import PastPaperSubmission from "../models/PastPaperSubmission.js";
import Course from "../models/Course.js";
import { verifyToken } from "../utils/jwt.js";

const DEMO_QUESTIONS_PAPER_1 = [
  { index: 0, questionText: "What is the output of printf(\"%d\", 5 + 3);?", options: ["5", "8", "53", "Error"], correctOptionIndex: 1 },
  { index: 1, questionText: "Which keyword is used for dynamic memory allocation in C?", options: ["new", "malloc", "alloc", "create"], correctOptionIndex: 1 },
  { index: 2, questionText: "What does the sizeof operator return?", options: ["Value", "Size in bytes", "Address", "Type"], correctOptionIndex: 1 },
];

const DEMO_QUESTIONS_PAPER_2 = [
  { index: 0, questionText: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Array", "Linked List"], correctOptionIndex: 1 },
  { index: 1, questionText: "Time complexity of binary search in a sorted array?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], correctOptionIndex: 1 },
  { index: 2, questionText: "What is a pointer?", options: ["Variable that holds value", "Variable that holds address", "Function", "Array"], correctOptionIndex: 1 },
];

async function ensureDemoPastPapers(courseId) {
  const existing = await PastPaper.find({ courseId }).sort({ paperIndex: 1 }).lean();
  if (existing.length > 0) return existing;

  const papers = [
    { courseId, paperIndex: 1, title: "Past Paper 1 (Demo)", questions: DEMO_QUESTIONS_PAPER_1 },
    { courseId, paperIndex: 2, title: "Past Paper 2 (Demo)", questions: DEMO_QUESTIONS_PAPER_2 },
  ];
  await PastPaper.insertMany(papers);
  return await PastPaper.find({ courseId }).sort({ paperIndex: 1 }).lean();
}

export async function getPastPapersList(courseId) {
  await db();
  if (!courseId) return { error: "courseId is required", status: 400 };
  const papers = await ensureDemoPastPapers(courseId);
  return {
    papers: papers.map((p) => ({
      _id: p._id,
      paperIndex: p.paperIndex,
      title: p.title || `Paper ${p.paperIndex}`,
      questionCount: (p.questions || []).length,
    })),
  };
}

const DEMO_PARAS = [
  "An operating system (OS) manages computer hardware and software resources. Two main functions: resource management (CPU, memory, I/O) and abstraction (simpler interface for applications).",
  "Dynamic memory allocation in C is done with malloc; sizeof returns size in bytes of a type or variable, used with malloc to allocate the correct amount of memory.",
  "The sizeof operator returns the size in bytes of its operand (type or variable). It is used with malloc and for array size calculations.",
  "A stack is LIFO (Last-In-First-Out); a queue is FIFO. Stacks are used in function calls and expression evaluation.",
  "Binary search on a sorted array repeatedly halves the search interval, giving O(log n) time complexity.",
  "A pointer is a variable that stores the memory address of another variable, used for dynamic memory and passing by reference.",
];

export async function getPastPaper(courseId, paperId) {
  await db();
  if (!courseId || !paperId) return { error: "courseId and paperId are required", status: 400 };
  const paper = await PastPaper.findOne({ _id: paperId, courseId });
  if (!paper) return { error: "Past paper not found", status: 404 };
  const courseDetails = await Course.findOne({ _id: courseId })
    .select("-_id -categoryId -createdAt -updatedAt -__v")
    .lean();
  if (!courseDetails) return { error: "Course not found", status: 404 };
  const questions = (paper.questions || []).map((q, i) => {
    const plain = q.toObject ? q.toObject() : { ...q };
    return { ...plain, referenceParagraph: plain.referenceParagraph || DEMO_PARAS[i % DEMO_PARAS.length] || DEMO_PARAS[0] };
  });
  return { questions, courseDetails };
}

export async function submitPastPaperAnswers({ token, courseId, paperId, attemptedAnswers }) {
  await db();
  if (!token) return { error: "Unauthorized", status: 401 };
  const decoded = verifyToken(token);
  const userId = decoded?.id || decoded?._id;
  if (!userId) return { error: "Unauthorized", status: 401 };
  if (!courseId || !paperId || !Array.isArray(attemptedAnswers))
    return { error: "Missing courseId, paperId, or attemptedAnswers", status: 400 };

  const paper = await PastPaper.findOne({ _id: paperId, courseId });
  if (!paper) return { error: "Past paper not found", status: 404 };

  let correctCount = 0;
  const report = [];
  const submittedAnswers = [];

  paper.questions.forEach((question, index) => {
    const selectedOptionIndex = attemptedAnswers[index];
    const isCorrect = selectedOptionIndex === question.correctOptionIndex;
    if (isCorrect) correctCount++;
    report.push({
      index: question.index,
      questionText: question.questionText,
      selectedOptionIndex,
      correctOptionIndex: question.correctOptionIndex,
      isCorrect,
    });
    submittedAnswers.push({ questionIndex: question.index, selectedOptionIndex });
  });

  const score = correctCount;
  const totalQuestions = paper.questions.length;
  await PastPaperSubmission.create({
    userId,
    pastPaperId: paper._id,
    submittedAnswers,
    score,
  });

  return {
    success: true,
    result: {
      totalQuestions,
      correctCount,
      wrongCount: totalQuestions - correctCount,
      percentage: ((score / totalQuestions) * 100).toFixed(2),
      report,
    },
  };
}
