import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiLogOut, FiLogIn, FiUserPlus, FiChevronDown } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { setStoredToken } from "../query/client";
import { motion, AnimatePresence } from "framer-motion";

const vu = "/assets/Images/vu.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setStoredToken(null);
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
    <nav className="sticky top-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-18 justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 flex items-center gap-3 group"
            onClick={closeAll}
          >
            <div className="relative">
              <img
                src={vu}
                alt="VU LMS"
                className="w-10 h-9 md:w-12 md:h-10 object-contain drop-shadow-sm transition-transform group-hover:scale-105"
              />
              <div className="absolute -inset-1 bg-indigo-500/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="hidden sm:inline text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Buddy
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive
                    ? "text-indigo-600 bg-indigo-50/80"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100/50"
                  }`
                }
              >
                {label}
                {/* Subtle active indicator dot */}
                <NavLink to={to}>
                  {({ isActive }) => (
                    isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-600"
                        transition={{ duration: 0.3 }}
                      />
                    )
                  )}
                </NavLink>
              </NavLink>
            ))}
          </div>

          {/* Right: profile dropdown + mobile toggle */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 h-10 pl-2 pr-3.5 rounded-2xl bg-white/50 border border-gray-200/50 hover:bg-white hover:border-indigo-100 hover:shadow-sm transition-all duration-300"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <div className="relative">
                  <img
                    src={user?.profilePicture || user?.profilePictureUrl || vu}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-gray-50 ring-offset-0"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <div className="hidden lg:flex flex-col items-start leading-none gap-0.5">
                  <span className="text-xs font-bold text-gray-800 max-w-[100px] truncate">
                    {user?.name ? user.name : "My Account"}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">
                    {user?.plan === "ultra_pro" ? "Ultra Pro" : user?.plan === "pro" ? "Pro Member" : "Free Plan"}
                  </span>
                </div>
                <FiChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-10"
                      aria-hidden="true"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-64 rounded-2xl shadow-xl shadow-gray-200/50 bg-white border border-gray-100 p-2 z-20 overflow-hidden"
                    >
                      {user?.name || user?.email ? (
                        <>
                          <div className="px-3 py-3 mb-1 bg-gray-50/50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <img
                                src={user?.profilePicture || user?.profilePictureUrl || vu}
                                alt=""
                                className="w-10 h-10 rounded-xl object-cover"
                              />
                              <div className="overflow-hidden">
                                <p className="text-sm font-bold text-gray-900 truncate">
                                  {user.name || "User"}
                                </p>
                                <p className="text-[11px] text-gray-500 truncate">
                                  {user.email || "Member"}
                                </p>
                              </div>
                            </div>
                            {(user.plan === "pro" || user.plan === "ultra_pro") && (
                              <div className="mt-2.5 py-1 px-2 rounded-lg bg-indigo-50 inline-flex items-center gap-1.5 border border-indigo-100/50">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                                  {user.plan === "ultra_pro" ? "Ultra Pro" : "Pro"}
                                </span>
                              </div>
                            )}
                          </div>

                          <Link
                            to="/analytics"
                            onClick={closeAll}
                            className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                          >
                            <FiUser size={18} />
                            Your Analytics
                          </Link>

                          <div className="h-px bg-gray-100 my-1 mx-2" />

                          <button
                            type="button"
                            onClick={handleLogout}
                            className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <FiLogOut size={18} />
                            Log out
                          </button>
                        </>
                      ) : (
                        <div className="grid grid-cols-1 gap-1">
                          <Link
                            to="/auth/login"
                            onClick={closeAll}
                            className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
                          >
                            <FiLogIn size={18} className="text-gray-400" />
                            Log in
                          </Link>
                          <Link
                            to="/auth/register"
                            onClick={closeAll}
                            className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-100 transition-all"
                          >
                            <FiUserPlus size={18} />
                            Register Now
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-xl bg-gray-100/50 text-gray-600 hover:bg-white hover:text-indigo-600 border border-transparent hover:border-gray-100 transition-all duration-300"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="md:hidden border-t border-gray-100 bg-white/80 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1.5">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={closeAll}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                      : "text-gray-700 hover:bg-white hover:shadow-sm"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              <div className="pt-4 mt-4 border-t border-gray-100">
                {user?.name || user?.email ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all"
                  >
                    <FiLogOut size={18} />
                    Log out
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/auth/login"
                      onClick={closeAll}
                      className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl text-sm font-bold text-gray-700 bg-gray-100 hover:bg-white transition-all shadow-sm"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/auth/register"
                      onClick={closeAll}
                      className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                    >
                      Join Buddy
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

