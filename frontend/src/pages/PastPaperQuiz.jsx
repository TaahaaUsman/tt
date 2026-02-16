import { useParams } from "react-router-dom";
import { usePastPaperQuery } from "../query/queries";
import QuizPage from "../components/QuizPage";

export default function PastPaperQuiz() {
  const { courseId, paperId } = useParams();
  const { data, isLoading } = usePastPaperQuery(courseId, paperId);

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading past paper...</div>;

  const quiz = data?.questions ?? null;
  const courseDetails = data?.courseDetails ?? null;

  return (
    <QuizPage
      quiz={quiz}
      courseDetails={courseDetails}
      courseId={courseId}
      type="pastpaper"
      paperId={paperId}
    />
  );
}
