import { Link, useNavigate } from "react-router-dom";
import { FaBookmark } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { FiGrid, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function CourseCard({
  course,
  variant = "default",
  onBookmark,
  onUnbookmark,
  index = 0,
}) {
  const navigate = useNavigate();
  const isBookmarked = variant === "bookmarked";
  const showBookmark = !!onBookmark || !!onUnbookmark;
  const isMock = course.isMock === true;
  const linkTo = isMock ? "/courses" : `/courses/${course._id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-100 transition-all duration-500"
    >
      <Link to={linkTo} className="block">
        <div className="aspect-[16/10] bg-gray-50 relative overflow-hidden">
          {course.imageUrl ? (
            <img
              src={course.imageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-8">
              <span className="text-4xl font-extrabold text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors duration-500">
                {course.code || "Course"}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" aria-hidden />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-indigo-600 shadow-sm border border-white/50">
              {course.code}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300 min-h-[2.75rem]">
              {course.title}
            </h3>
          </div>
          {course.categoryName && (
            <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-50 text-[11px] font-semibold text-gray-500 border border-gray-100">
              {course.categoryName}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            {!isMock ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/courses/${course._id}#mindmap`);
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-indigo-500 hover:text-indigo-600 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <FiGrid size={14} />
                </div>
                Mind Map
              </button>
            ) : <div />}

            <div className="flex items-center gap-2 text-indigo-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <span className="text-[11px] font-bold">Details</span>
              <FiArrowRight size={14} />
            </div>
          </div>
        </div>
      </Link>

      {showBookmark && (
        <div className="px-6 pb-6 pt-0">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              isBookmarked ? onUnbookmark?.(course._id, course.code) : onBookmark?.(course._id, course.code);
            }}
            className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 ${isBookmarked
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                : "bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark course"}
          >
            {isBookmarked ? (
              <>
                <CiBookmark size={18} className="stroke-2" />
                Saved to Library
              </>
            ) : (
              <>
                <FaBookmark size={14} className="opacity-70" />
                Save for Later
              </>
            )}
          </button>
        </div>
      )}
    </motion.article>
  );
}

