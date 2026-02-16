import { useParams } from "react-router-dom";
import { useCourseDetailsQuery } from "../query/queries";
import CourseDetailsButton from "../components/CourseDetailsButton";
import ShortNotes from "../components/ShortNotes";
import PastPapersSection from "../components/PastPapersSection";
import SubjectiveQuestionsSection from "../components/SubjectiveQuestionsSection";
import Loader from "../components/Loader";

export default function CourseDetail() {
  const { id: courseId } = useParams();
  const { data: course, isLoading } = useCourseDetailsQuery(courseId);

  if (isLoading) return <Loader />;
  if (!course) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600 text-lg">Course not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 mb-3">
          {course.code}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {course.title}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Short Notes</h2>
          <ShortNotes courseCode={course?.code} courseId={course?._id} />
        </div>
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">Quiz</h2>
          <CourseDetailsButton courseId={course._id} />
        </div>
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4 text-amber-700">Past Papers</h2>
          <PastPapersSection courseId={course._id} />
        </div>
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">Short & Long Questions</h2>
          <SubjectiveQuestionsSection courseId={course._id} />
        </div>
      </div>
    </div>
  );
}
