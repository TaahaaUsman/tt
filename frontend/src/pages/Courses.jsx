import { useCoursesQuery } from "../query/queries";
import CourseList from "../components/CourseList";
import Loader from "../components/Loader";

export default function Courses() {
  const { data: courses = [], isLoading } = useCoursesQuery();

  if (isLoading) return <Loader />;

  return <CourseList courses={courses} />;
}
