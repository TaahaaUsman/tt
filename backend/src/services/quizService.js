import db from "../config/db.js";
import Quiz from "../models/Quiz.js";
import Course from "../models/Course.js";
import Submission from "../models/Submission.js";
import { verifyToken } from "../utils/jwt.js";

const DEMO_REFERENCE_PARAGRAPHS = [
  "An operating system (OS) is system software that manages computer hardware and software resources and provides common services for computer programs. The two main functions of an OS are: (1) Resource management — it allocates CPU time, memory, and I/O devices to running programs; (2) Abstraction — it provides a simpler interface for applications to use hardware (e.g., file systems, process scheduling). Without an OS, each program would need to handle hardware directly, which would be complex and error-prone.",
  "In C and C-like languages, dynamic memory allocation is done using library functions such as malloc (C) or the keyword new (C++). malloc stands for 'memory allocation' and returns a pointer to a block of memory of the requested size from the heap. The sizeof operator returns the size in bytes of a type or variable, which is useful when allocating the correct amount of memory (e.g., malloc(sizeof(int))).",
  "The sizeof operator is a compile-time unary operator that returns the size in bytes of its operand — either a data type or a variable. For example, sizeof(int) typically returns 4 on 32-bit systems. It is commonly used with malloc to allocate the correct number of bytes and with arrays to compute the number of elements.",
  "A stack is a Last-In-First-Out (LIFO) data structure: the last element added is the first one removed. Operations are push (add) and pop (remove). A queue is First-In-First-Out (FIFO). Stacks are used in function call management, expression evaluation, and undo operations.",
  "Binary search works on a sorted array by repeatedly dividing the search interval in half. At each step it compares the target with the middle element; if not equal, it narrows the interval to the lower or upper half. Thus the number of comparisons is proportional to log₂(n), giving time complexity O(log n).",
  "A pointer is a variable that stores the memory address of another variable. Instead of holding a value directly, it 'points to' where the value is stored. Pointers are used for dynamic memory, arrays, and passing large data by reference. In C, we declare a pointer with the * symbol (e.g., int *ptr).",
];

function getDemoParagraph(index) {
  return DEMO_REFERENCE_PARAGRAPHS[index % DEMO_REFERENCE_PARAGRAPHS.length] || DEMO_REFERENCE_PARAGRAPHS[0];
}

export async function getQuiz(courseId, type) {
  await db();
  if (!courseId || !type) return { error: "courseId and type are required", status: 400 };
  const quiz = await Quiz.findOne({ courseId, type });
  if (!quiz) return { error: "No quiz found for this course and type", status: 404 };
  await Quiz.findOneAndUpdate({ courseId, type }, { $inc: { visitCount: 1 } }, { new: true });
  const courseDetails = await Course.findOne({ _id: courseId })
    .select("-_id -categoryId -createdAt -updatedAt -__v")
    .lean();
  if (!courseDetails) return { error: "No Course found", status: 404 };
  const questions = (quiz.questions || []).map((q, i) => {
    const plain = q.toObject ? q.toObject() : { ...q };
    return {
      ...plain,
      referenceParagraph: (plain.referenceParagraph && String(plain.referenceParagraph).trim()) || getDemoParagraph(i),
    };
  });
  return { questions, courseDetails };
}

export async function submitQuizAnswers({ token, courseId, type, attemptedAnswers }) {
  await db();
  if (!token) return { error: "Unauthorized", status: 401 };
  const decoded = verifyToken(token);
  const userId = decoded?.id || decoded?._id;
  if (!userId) return { error: "Unauthorized", status: 401 };
  if (!courseId || !type || !Array.isArray(attemptedAnswers))
    return { error: "Missing courseId, type, or attemptedAnswers", status: 400 };

  const quiz = await Quiz.findOne({ courseId, type });
  if (!quiz) return { error: "Quiz not found for provided course and type", status: 404 };

  let correctCount = 0;
  const report = [];
  const submittedAnswers = [];

  quiz.questions.forEach((question, index) => {
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
  const totalQuestions = quiz.questions.length;
  await Submission.create({ userId, quizId: quiz._id, submittedAnswers, score });

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
