import { NavLink, useSearchParams } from "react-router-dom";
import { category } from "../data/categorie";
import useIsMobile from "../utils/useIsMobile";

export default function Sidebar() {
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "";

  if (isMobile) return null;

  return (
    <aside className="hidden md:block w-64 shrink-0 border-r border-gray-200 bg-white">
      <div className="sticky top-20 py-6 flex flex-col h-[calc(100vh-6rem)]">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-6 mb-3">
          Browse
        </p>
        <nav className="flex-1 overflow-y-auto px-4 space-y-0.5 min-h-0">
          <NavLink
            to="/courses"
            end
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive && !currentCategory
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            All courses
          </NavLink>
          <div className="pt-3 pb-1">
            <p className="px-4 py-1.5 text-xs font-medium text-gray-400 uppercase tracking-wider">
              Categories
            </p>
          </div>
          {category.map((cat) => {
            const isActive = currentCategory === cat._id;
            return (
              <NavLink
                key={cat._id}
                to={`/courses?category=${cat._id}`}
                className={({ isActive: linkActive }) =>
                  `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive || linkActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {cat.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
