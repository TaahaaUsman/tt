import { useSelector } from "react-redux";
import { useBookmarkedQuery } from "../query/queries";
import HomePage from "../components/Home";
import Loader from "../components/Loader";
import { useMouseTracking } from "../hooks/useMouseTracking";

export default function Home() {
  const user = useSelector((state) => state.auth.user);
  const { data: bookmarkedCourses = [], isLoading } = useBookmarkedQuery(!!user?._id || !!user?.id);

  useMouseTracking(true, "/");

  if (isLoading) return <Loader />;

  return <HomePage bookmarkedCourses={bookmarkedCourses} />;
}
