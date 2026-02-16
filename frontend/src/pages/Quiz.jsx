import { useParams } from "react-router-dom";
import { useQuizQuery } from "../query/queries";
import QuizPage from "../components/QuizPage";

export default function Quiz() {
  const { type, courseId } = useParams();
  const { data, isLoading } = useQuizQuery(type, courseId);

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading quiz...</div>;

  const quiz = data?.questions ?? null;
  const courseDetails = data?.courseDetails ?? null;

  return (
    <QuizPage
      quiz={quiz}
      courseDetails={courseDetails}
      courseId={courseId}
      type={type}
    />
  );
}
