import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiLogOut, FiLogIn, FiUserPlus } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const vu = "/assets/Images/vu.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate("/auth/login");
  };

  const closeAll = () => {
    setDropdownOpen(false);
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 md:h-16 justify-between items-center">
          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center gap-2" onClick={closeAll}>
            <img
              src={vu}
              alt="VU LMS"
              className="w-10 h-9 md:w-[52px] md:h-10 object-contain"
            />
            <span className="hidden sm:inline text-lg font-semibold text-gray-800">
              LMS
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right: profile dropdown + mobile toggle */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 h-9 pl-2 pr-2.5 md:pl-3 md:pr-3 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200/80 transition-colors"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <img
                  src={user?.profilePictureUrl || vu}
                  alt=""
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="hidden lg:inline text-sm font-medium text-gray-700 max-w-[120px] truncate">
                  {user?.name ? user.name : "Account"}
                </span>
              </button>
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    aria-hidden="true"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-60 rounded-xl shadow-lg bg-white border border-gray-200 py-2 z-20">
                    {user?.name || user?.email ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900 truncate flex items-center gap-2">
                            <FiUser className="shrink-0 text-gray-400" />
                            {user.name || "User"}
                          </p>
                          {user.email && (
                            <p className="text-xs text-gray-500 truncate mt-0.5 pl-6">
                              {user.email}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <FiLogOut className="shrink-0" />
                          Log out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/auth/login"
                          onClick={closeAll}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <FiLogIn className="shrink-0" />
                          Log in
                        </Link>
                        <Link
                          to="/auth/register"
                          onClick={closeAll}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <FiUserPlus className="shrink-0" />
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-gray-50/80">
          <div className="px-4 py-4 space-y-0.5">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeAll}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-white hover:shadow-sm"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="pt-3 mt-3 border-t border-gray-200">
              {user?.name || user?.email ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm"
                >
                  <FiLogOut />
                  Log out
                </button>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    onClick={closeAll}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm"
                  >
                    <FiLogIn />
                    Log in
                  </Link>
                  <Link
                    to="/auth/register"
                    onClick={closeAll}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <FiUserPlus />
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
