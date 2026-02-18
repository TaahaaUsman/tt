import { NavLink, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { category } from "../data/categorie";
import useIsMobile from "../utils/useIsMobile";
import { motion } from "framer-motion";

export default function Sidebar() {
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "";
  const user = useSelector((state) => state.auth.user);

  if (isMobile) return null;

  return (
    <aside className="w-64 flex-shrink-0 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto hidden md:block border-r border-gray-100 bg-white/50 backdrop-blur-xl">
      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 px-2">
            Learning Paths
          </h3>
          <nav className="space-y-1">
            <NavLink
              to="/courses"
              end
              className={({ isActive }) =>
                `group flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 ${isActive && !currentCategory
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                  : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
                }`
              }
            >
              <span>All Courses</span>
              <span className="text-[10px] opacity-50 font-medium">✨</span>
            </NavLink>

            {category.map((cat) => {
              const isActive = currentCategory === cat._id;
              return (
                <NavLink
                  key={cat._id}
                  to={`/courses?category=${cat._id}`}
                  className={`group flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 ${isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                      : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                >
                  <span className="truncate">{cat.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {user && (
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 px-2">
              Account
            </h3>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                  : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
                }`
              }
            >
              Profile Settings
            </NavLink>
          </div>
        )}
      </div>
    </aside>
  );
}
