import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSubjectiveQuestionsQuery, useSubmitSubjectiveMutation } from "../query/queries";
import Loader from "../components/Loader";

export default function SubjectiveQuestions() {
  const { courseId } = useParams();
  const { data: questions = [], isLoading } = useSubjectiveQuestionsQuery(courseId);
  const submitMutation = useSubmitSubjectiveMutation();
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const attempts = questions.map((q) => ({
      questionId: q._id,
      answerText: answers[q._id]?.trim() ?? "",
    }));
    try {
      const data = await submitMutation.mutateAsync({ courseId, attempts });
      setResult(data);
    } catch (err) {
      setResult({ error: err?.message || "Failed to submit. Try again." });
    }
  };

  const handleTryAgain = () => {
    setResult(null);
    setAnswers({});
  };

  if (isLoading) return <Loader />;

  if (result && !result.error) {
    const { results = [], totalMarks, totalMax, percentage } = result;
    return (
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Result — Short & Long Questions</h1>
          <Link to={`/courses/${courseId}`} className="text-blue-600 hover:underline">
            Back to Course
          </Link>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Total Marks</p>
              <p className="text-2xl font-bold text-green-700">
                {totalMarks} / {totalMax}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Percentage</p>
              <p className="text-2xl font-bold text-green-700">{percentage}%</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {results.map((r, idx) => (
            <div
              key={r.questionId || idx}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-gray-500 mb-1">
                {r.type === "short" ? "Short" : "Long"} question · {r.marks}/{r.maxMarks} marks
              </p>
              <p className="font-medium text-gray-900 mb-2">{r.questionText}</p>
              {r.answerText && (
                <p className="text-gray-700 text-sm mb-2 pl-2 border-l-2 border-gray-200">
                  Your answer: {r.answerText}
                </p>
              )}
              <p className="text-sm text-teal-700 bg-teal-50 rounded p-2">{r.feedback}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={handleTryAgain}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
          >
            Try Again
          </button>
          <Link
            to={`/courses/${courseId}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
          >
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  if (result?.error) {
    return (
      <div className="p-8 max-w-md mx-auto text-center">
        <p className="text-red-600 mb-4">{result.error}</p>
        <button type="button" onClick={handleTryAgain} className="px-4 py-2 bg-gray-800 text-white rounded-lg">
          Try Again
        </button>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="p-8 max-w-md mx-auto text-center">
        <p className="text-gray-600">No questions available for this course.</p>
        <Link to={`/courses/${courseId}`} className="text-blue-600 hover:underline mt-2 inline-block">
          Back to Course
        </Link>
      </div>
    );
  }

  const shortQuestions = questions.filter((q) => q.type === "short");
  const longQuestions = questions.filter((q) => q.type === "long");

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Short & Long Questions</h1>
        <Link to={`/courses/${courseId}`} className="text-blue-600 hover:underline">
          Back to Course
        </Link>
      </div>
      <p className="text-gray-600 mb-6">
        Short questions: 3 marks each. Long questions: 5 marks each. Answers are evaluated by AI.
      </p>
      <form onSubmit={handleSubmit} className="space-y-8">
        {shortQuestions.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Short Questions (3 marks each)</h2>
            <div className="space-y-4">
              {shortQuestions.map((q, i) => (
                <div key={q._id} className="bg-white border border-gray-200 rounded-xl p-4">
                  <p className="font-medium text-gray-900 mb-2">
                    {i + 1}. {q.questionText} <span className="text-gray-500 text-sm">(3 marks)</span>
                  </p>
                  <textarea
                    value={answers[q._id] ?? ""}
                    onChange={(e) => handleChange(q._id, e.target.value)}
                    placeholder="Write your answer here..."
                    className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
        {longQuestions.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Long Questions (5 marks each)</h2>
            <div className="space-y-4">
              {longQuestions.map((q, i) => (
                <div key={q._id} className="bg-white border border-gray-200 rounded-xl p-4">
                  <p className="font-medium text-gray-900 mb-2">
                    {shortQuestions.length + i + 1}. {q.questionText} <span className="text-gray-500 text-sm">(5 marks)</span>
                  </p>
                  <textarea
                    value={answers[q._id] ?? ""}
                    onChange={(e) => handleChange(q._id, e.target.value)}
                    placeholder="Write your detailed answer here..."
                    className="w-full min-h-[160px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    rows={6}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitMutation.isPending}
            className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50"
          >
            {submitMutation.isPending ? "Evaluating…" : "Submit for Evaluation"}
          </button>
          <Link to={`/courses/${courseId}`} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
