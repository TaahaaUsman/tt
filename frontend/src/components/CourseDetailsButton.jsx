import { useNavigate } from "react-router-dom";

export default function CourseDetailsButton({ courseId }) {
  const navigate = useNavigate();

  const handleQuizRedirect = (type) => {
    navigate(`/quiz/${type}/${courseId}`);
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={() => handleQuizRedirect("midterm")}
        className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all duration-200"
      >
        Midterm Quiz
      </button>
      <button
        onClick={() => handleQuizRedirect("finalterm")}
        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200"
      >
        Finalterm Quiz
      </button>
    </div>
  );
}
