import { useNavigate } from "react-router-dom";
import { MdEditDocument } from "react-icons/md";

export default function SubjectiveQuestionsSection({ courseId }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-gray-600">
        Attempt short (3 marks) and long (5 marks) questions. Answers are evaluated by AI.
      </p>
      <button
        type="button"
        onClick={() => navigate(`/courses/${courseId}/questions`)}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
      >
        <MdEditDocument size={20} />
        Attempt Short & Long Questions
      </button>
    </div>
  );
}
