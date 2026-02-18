import { useParams } from "react-router-dom";
import { useCourseDetailsQuery } from "../query/queries";
import MindMapTree from "../components/MindMapTree";
import { mindmapSampleData } from "../data/mindmapSample";
import Loader from "../components/Loader";

export default function CourseMindMap() {
  const { id: courseId } = useParams();
  const { data: course, isLoading } = useCourseDetailsQuery(courseId);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-[1600px] mx-auto">
        {course && (
          <div className="mb-4">
            <span className="inline-block px-2 py-0.5 rounded text-sm font-medium bg-cyan-100 text-cyan-800">
              {course.code}
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
              {course.title} – Mind map
            </h1>
          </div>
        )}
        <div className="rounded-xl overflow-hidden bg-gray-900 shadow-lg">
          <MindMapTree data={mindmapSampleData} className="min-h-[calc(100vh-8rem)]" />
        </div>
      </div>
    </div>
  );
}
