import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { motion } from "framer-motion";

export default function CourseCard({
  course,
  variant = "default",
  onBookmark,
  onUnbookmark,
  index = 0,
}) {
  const isBookmarked = variant === "bookmarked";
  const showBookmark = !!onBookmark || !!onUnbookmark;
  const isMock = course.isMock === true;
  const linkTo = isMock ? "/courses" : `/courses/${course._id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-600/20 transition-all duration-300"
    >
      <Link to={linkTo} className="block">
        <div className="aspect-16/10 bg-linear-to-br from-blue-600/10 via-blue-600/5 to-gray-100 relative overflow-hidden">
          {course.imageUrl ? (
            <img
              src={course.imageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-bold text-blue-600/20 group-hover:text-blue-600/30 transition-colors">
                {course.code?.slice(0, 2) || "CS"}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" aria-hidden />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700 shadow-sm">
              {course.code}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-10">
            {course.title}
          </h3>
          {course.categoryName && (
            <p className="mt-1.5 text-sm text-gray-500">{course.categoryName}</p>
          )}
        </div>
      </Link>
      {showBookmark && (
        <div className="px-5 pb-4 pt-0">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              isBookmarked ? onUnbookmark?.(course._id, course.code) : onBookmark?.(course._id, course.code);
            }}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark course"}
          >
            {isBookmarked ? (
              <>
                <CiBookmark size={20} className="fill-blue-600 text-blue-600" />
                Saved
              </>
            ) : (
              <>
                <FaBookmark size={18} className="opacity-70" />
                Save
              </>
            )}
          </button>
        </div>
      )}
    </motion.article>
  );
}
