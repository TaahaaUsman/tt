import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { useUnbookmarkMutation } from "../query/queries";
import { category } from "../data/categorie";
import { MOCK_SUGGESTED, MOCK_TRENDING, MOCK_POPULAR, MOCK_HOT_NEW } from "../data/mockDiscover";
import CourseCard from "./CourseCard";
import SectionBlock from "./SectionBlock";
import { motion } from "framer-motion";

export default function HomePage({ bookmarkedCourses = [] }) {
  const user = useSelector((state) => state.auth.user);
  const unbookmarkMutation = useUnbookmarkMutation();

  const unBookMark = async (courseId, code) => {
    try {
      await unbookmarkMutation.mutateAsync(courseId);
      toast.success(`${code} removed from bookmarks`);
    } catch (err) {
      console.error("Unbookmark failed");
    }
  };

  const viewAllLink = (label = "View all") => (
    <Link to="/courses" className="text-sm font-medium text-blue-600 hover:underline">
      {label} →
    </Link>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50/50">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-2xl mx-4 md:mx-8 mt-4 md:mt-6 mb-8 overflow-hidden bg-linear-to-br from-blue-600 to-blue-800 text-white px-6 py-10 md:px-12 md:py-14 shadow-xl"
      >
        <div className="relative z-10">
          <p className="text-blue-100 text-sm font-medium uppercase tracking-wider mb-1">
            {user ? "Welcome back" : "Welcome"}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {user?.name ? `Hello, ${user.name}!` : "Hello!"}
          </h1>
          <p className="text-blue-100/90 max-w-xl text-lg">
            {user
              ? "Continue learning from your saved courses or explore new ones by category."
              : "Browse all courses. Sign in to save courses and access quizzes & notes."}
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-colors shadow-md"
          >
            Browse all courses
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-linear-to-l from-white/10 to-transparent pointer-events-none" />
      </motion.section>

      {/* Optional sign-in banner – only when not logged in */}
      {!user && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 md:px-8 mb-8 max-w-7xl mx-auto"
        >
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-700 mb-4">
              Sign in to save courses and access quizzes & notes.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                <FcGoogle className="text-lg" />
                Sign in with Google
              </Link>
              <span className="text-gray-400 text-sm">or</span>
              <Link
                to="/auth/login"
                className="px-4 py-2.5 rounded-xl border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/auth/register"
                className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </motion.section>
      )}

      <div className="px-4 md:px-8 pb-12 max-w-7xl mx-auto">
        {/* —— Discover —— */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            Discover
          </p>

          <SectionBlock title="Suggested for you" action={viewAllLink("View all")}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {MOCK_SUGGESTED.map((course, index) => (
                <CourseCard key={course._id} course={course} index={index} />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock title="Trending" action={viewAllLink("Explore courses")}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {MOCK_TRENDING.map((course, index) => (
                <CourseCard key={course._id} course={course} index={index} />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock title="Hot new releases" action={viewAllLink("See all")}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {MOCK_HOT_NEW.map((course, index) => (
                <CourseCard key={course._id} course={course} index={index} />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock title="Popular" action={viewAllLink("View all")}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {MOCK_POPULAR.map((course, index) => (
                <CourseCard key={course._id} course={course} index={index} />
              ))}
            </div>
          </SectionBlock>
        </div>

        {/* —— Your learning —— */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            Your learning
          </p>
          <SectionBlock title="My bookmarks">
            {bookmarkedCourses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-14 px-6 rounded-2xl border-2 border-dashed border-gray-200 bg-white"
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3 text-3xl">
                  📚
                </div>
                <p className="text-gray-600 text-center max-w-sm mb-2 text-sm">
                  {user
                    ? "You haven’t saved any courses yet. Browse courses and tap “Save” to add them here."
                    : "Sign in to save courses and see them here."}
                </p>
                {!user && (
                  <p className="text-gray-500 text-center max-w-sm mb-4 text-xs">
                    You can still browse all courses without signing in.
                  </p>
                )}
                <div className="flex flex-wrap gap-2 justify-center">
                  {user ? (
                    <Link
                      to="/courses"
                      className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Explore courses
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/auth/login"
                        className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/courses"
                        className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50"
                      >
                        Browse courses
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {bookmarkedCourses.map((course, index) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    variant="bookmarked"
                    onUnbookmark={unBookMark}
                    index={index}
                  />
                ))}
              </div>
            )}
          </SectionBlock>
        </div>

        {/* —— Explore by category (structured grid) —— */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            Explore
          </p>
          <SectionBlock title="Browse by category">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {category.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/courses?category=${cat._id}`}
                  className="px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:border-blue-600 hover:text-blue-600 hover:shadow-md transition-all text-center"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </SectionBlock>
        </div>
      </div>
    </div>
  );
}
