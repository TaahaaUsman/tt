import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useBookmarkMutation } from "../query/queries";
import { category } from "../data/categorie";
import CourseCard from "./CourseCard";
import SectionBlock from "./SectionBlock";
import { motion, AnimatePresence } from "framer-motion";

function getCategoryName(categoryId) {
  const found = category.find((c) => c._id === categoryId);
  return found?.name ?? null;
}

export default function CourseList({ courses = [] }) {
  const user = useSelector((state) => state.auth.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category") || "";
  const [searchQuery, setSearchQuery] = useState("");
  const bookmarkMutation = useBookmarkMutation();

  const bookMark = async (courseId, code) => {
    if (!user) return;
    try {
      await bookmarkMutation.mutateAsync(courseId);
      toast.success(`${code} saved`);
    } catch (err) {
      toast.error("Failed to save.");
    }
  };

  const filteredCourses = useMemo(() => {
    let list = courses.filter(
      (course) =>
        course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    if (categoryId) {
      list = list.filter(
        (course) =>
          course.categoryId === categoryId || course.category === categoryId,
      );
    }
    return list;
  }, [courses, searchQuery, categoryId]);

  const coursesWithCategoryName = useMemo(
    () =>
      filteredCourses.map((c) => ({
        ...c,
        categoryName: (c.categoryId && getCategoryName(c.categoryId)) || (c.category && getCategoryName(c.category)) || null,
      })),
    [filteredCourses],
  );

  const pageTitle = categoryId ? getCategoryName(categoryId) || "Courses" : "All courses";

  return (
    <div className="w-full min-h-screen bg-gray-50/50">
      <div className="px-4 md:px-8 pb-12 max-w-7xl mx-auto">
        {/* Page header */}
        <div className="pt-6 pb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
            Course catalog
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {pageTitle}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Search & filter bar */}
        <div className="mb-8 p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search by code or title..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {categoryId && (
              <button
                type="button"
                onClick={() => setSearchParams({})}
                className="px-4 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 whitespace-nowrap text-sm font-medium"
              >
                Clear category filter
              </button>
            )}
          </div>
        </div>

        {/* Course grid */}
        <SectionBlock title={filteredCourses.length > 0 ? "Courses" : ""}>
          {coursesWithCategoryName.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 rounded-2xl bg-white border border-gray-200"
            >
              <p className="text-gray-600 mb-2">
                {searchQuery || categoryId
                  ? "No courses match your filters."
                  : "No courses available."}
              </p>
              {(searchQuery || categoryId) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchParams({});
                  }}
                  className="text-blue-600 font-medium hover:underline text-sm"
                >
                  Clear filters
                </button>
              )}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <AnimatePresence mode="popLayout">
                {coursesWithCategoryName.map((course, index) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    onBookmark={user ? bookMark : undefined}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </SectionBlock>
      </div>
    </div>
  );
}
