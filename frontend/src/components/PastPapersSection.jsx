import { useNavigate } from "react-router-dom";
import { usePastPapersListQuery } from "../query/queries";
import { MdDescription } from "react-icons/md";

export default function PastPapersSection({ courseId }) {
  const navigate = useNavigate();
  const { data: papers = [], isLoading } = usePastPapersListQuery(courseId);

  const handleOpenPaper = (paperId) => {
    navigate(`/quiz/pastpaper/${courseId}/${paperId}`);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-2">
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {papers.length === 0 ? (
        <p className="text-gray-500 text-sm">No past papers added yet.</p>
      ) : (
        papers.map((paper) => (
          <button
            key={paper._id}
            onClick={() => handleOpenPaper(paper._id)}
            className="w-full flex items-center gap-3 py-3 px-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg hover:bg-amber-100 hover:border-amber-300 transition-all duration-200 text-left"
          >
            <MdDescription className="text-amber-600 shrink-0" size={22} />
            <span className="font-medium flex-1">{paper.title || `Paper ${paper.paperIndex}`}</span>
            <span className="text-xs text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded">
              {paper.questionCount || 0} MCQs
            </span>
          </button>
        ))
      )}
    </div>
  );
}
