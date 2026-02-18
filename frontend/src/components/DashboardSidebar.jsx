import { useState, useCallback } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiHome,
  FiBook,
  FiMessageSquare,
  FiBell,
  FiCreditCard,
  FiMenu,
  FiX,
} from "react-icons/fi";

const vu = "/assets/Images/vu.png";

export default function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const isActivePath = (path, paths = []) => {
    const all = [path, ...paths];
    return all.some(
      (p) =>
        (p !== "/" && location.pathname.startsWith(p)) ||
        (p === "/" && location.pathname === "/")
    );
  };

  const NavItem = ({ to, icon: Icon, label, end = false, paths = [] }) => (
    <NavLink
      to={to}
      end={end}
      onClick={closeMobile}
      className={({ isActive }) =>
        `dashboard-sidebar__link ${isActive || isActivePath(to, paths) ? "active" : ""}`
      }
    >
      {Icon && <Icon size={20} />}
      <span>{label}</span>
    </NavLink>
  );

  const SidebarContent = () => (
    <>
      <div className="dashboard-sidebar__logo">
        <Link to="/" onClick={closeMobile} className="flex items-center">
          <img src={vu} alt="Buddy" className="h-10 w-auto object-contain" />
        </Link>
      </div>
      <div className="dashboard-sidebar__nav">
        <span className="dashboard-sidebar__nav-label">Main Menu</span>
        <NavItem to="/" icon={FiHome} label="Home" end />
        <NavItem to="/courses" icon={FiBook} label="All Courses" end paths={["/courses"]} />
        <NavItem to="/ai-chat" icon={FiMessageSquare} label="AI Chat" paths={["/ai-chat"]} />
        <NavItem to="/notifications" icon={FiBell} label="Notifications" paths={["/notifications"]} />
        <NavItem to="/billing" icon={FiCreditCard} label="Billing" paths={["/billing", "/pricing"]} />
      </div>
      <div className="dashboard-sidebar__bottom">
        <NavLink
          to="/profile"
          onClick={closeMobile}
          className={`dashboard-sidebar__link w-full justify-between ${
            location.pathname === "/profile" ? "active" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={user?.profilePicture || user?.profilePictureUrl || vu}
              alt=""
              className="w-9 h-9 rounded-full object-cover ring-2 ring-white/30 shrink-0"
            />
            <span className="text-white text-sm font-medium truncate">
              {user?.name || "Profile"}
            </span>
          </div>
        </NavLink>
      </div>
    </>
  );

  return (
    <>
      <aside className="dashboard-sidebar dashboard-sidebar--desktop hidden lg:flex">
        <SidebarContent />
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 bg-[#0a2d4f] z-[1100] shadow-md">
        <Link to="/" className="flex items-center">
          <img src={vu} alt="Buddy" className="h-8 w-auto object-contain" />
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[1150] lg:hidden"
          onClick={closeMobile}
          aria-hidden
        />
      )}
      <aside
        className={`dashboard-sidebar dashboard-sidebar--mobile ${mobileOpen ? "active" : ""}`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
