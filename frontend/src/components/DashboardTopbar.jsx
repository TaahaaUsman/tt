import { useState } from "react";
import { useSelector } from "react-redux";
import { FiSearch, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function DashboardTopbar() {
  const user = useSelector((state) => state.auth.user);
  const [search, setSearch] = useState("");
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="dashboard-topbar">
      <h3 className="dashboard-topbar__greeting">
        {getGreeting()}, {firstName}
      </h3>
      <div className="hidden lg:flex items-center gap-3 flex-1 justify-end">
        <div className="relative flex-1 max-w-[300px]">
          <FiSearch
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="dashboard-topbar__search w-full"
          />
        </div>
        <Link
          to="/profile"
          className="dashboard-topbar__btn"
        >
          <FiSettings size={18} />
          Settings
        </Link>
      </div>
    </div>
  );
}
