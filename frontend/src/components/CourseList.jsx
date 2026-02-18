import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useBookmarkMutation } from "../query/queries";
import { category } from "../data/categorie";
import CourseCard from "./CourseCard";
import SectionBlock from "./SectionBlock";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiFilter, FiXCircle } from "react-icons/fi";

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
      toast.success(`${code} saved to your library`);
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

  const pageTitle = categoryId ? getCategoryName(categoryId) || "Courses" : "All Courses";

  return (
    <div className="w-full min-h-screen bg-[#fdfdfd]">
      <div className="px-4 md:px-8 pb-20 max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              Course Catalog
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
              {pageTitle}
            </h1>
            <p className="mt-3 text-gray-500 font-medium max-w-lg">
              {categoryId
                ? `Explore our specialized selection of courses for ${pageTitle}.`
                : "Browse through our comprehensive library of premium courses and learning materials."}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-white border border-gray-100 shadow-sm text-sm font-bold text-gray-700">
              <span className="text-indigo-600">{filteredCourses.length}</span> Results
            </div>
          </div>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 p-3 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/40 flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="relative flex-1 w-full">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search courses by name or code..."
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50/50 border border-transparent focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all font-medium text-gray-700 placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {categoryId && (
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:border-red-200 hover:text-red-600 transition-all font-bold text-sm"
            >
              <FiXCircle size={18} />
              Clear Category
            </button>
          )}

          <div className="hidden sm:flex items-center gap-3 px-4 py-2 border-l border-gray-100 text-gray-400">
            <FiFilter size={20} />
          </div>
        </motion.div>

        {/* Course Grid */}
        <SectionBlock title={filteredCourses.length > 0 ? "Available Resources" : ""}>
          <AnimatePresence mode="popLayout">
            {coursesWithCategoryName.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-24 rounded-[3rem] bg-gray-50/50 border border-dashed border-gray-200"
              >
                <div className="w-20 h-20 rounded-3xl bg-white shadow-inner flex items-center justify-center mx-auto mb-6 text-3xl">
                  🔎
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">No Courses Found</h3>
                <p className="text-gray-500 font-medium mb-8 max-w-xs mx-auto">
                  {searchQuery || categoryId
                    ? "We couldn't find any courses matching your current search or category filters."
                    : "There are currently no courses available in this section."}
                </p>
                {(searchQuery || categoryId) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchParams({});
                    }}
                    className="px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
                  >
                    Reset All Filters
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {coursesWithCategoryName.map((course, index) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    onBookmark={user ? bookMark : undefined}
                    index={index}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </SectionBlock>
      </div>
    </div>
  );
}

