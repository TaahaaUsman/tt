import React, { useState, useCallback } from "react";
import { Image } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Dashboard,
  Participant,
  Logout,
  Plus,
  Toggle,
  Setting,
  RecourdManagement,
  ConsentSetupIcon,
  ReportManagement,
  Company,
  NewsAndFeature,
  Encounter,
  UserIcon,
} from "../../assets/Svgs/Svgs";
import logo from "../../assets/offwhite-logo.png";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logoutApi } from "../../redux/features/authSlice";

const DashboardSidebar = () => {
  const [burgerSidebarActive, setBurgerSidebarActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  // Fallback to superadmin if role is not set (for development without backend)
  const role = auth?.role?.toLowerCase() || "superadmin";

  const toggleSidebar = useCallback(() => {
    setBurgerSidebarActive((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setBurgerSidebarActive(false);
  }, []);

  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutApi(auth.token)).unwrap();
      if (result.success) {
        toast.success(result.message || "Logout successfully!");
        navigate("/");
      }
    } catch {
      // Even if logout API fails, clear local state and navigate
      toast.success("Logout successful");
      navigate("/");
    }
  };

  const healthcoachesLinks = [
    {
      name: "Dashboard",
      path: "/health-coach-dashboard",
      icon: <Dashboard />,
      activePaths: ["/health-coach-dashboard"],
    },
    {
      name: "Company",
      path: "/company",
      icon: <Company />,
      activePaths: ["/company", "/add-new-consents", "/create-new-company"],
    },
    {
      name: "Consent",
      path: "/consent",
      icon: <ConsentSetupIcon />,
      activePaths: ["/consent", "/consent-statement-information"],
    },
    {
      name: "Participant",
      path: "/participant",
      icon: <Participant />,
      activePaths: [
        "/participant",
        "/create-new-participant",
        "/open-modify-encounter",
        "/modify-ecounter-type",
      ],
    },
    {
      name: "Encounters",
      path: "/encounters",
      icon: <Encounter />,
      activePaths: [
        "/encounters",
        "/add-new-encounter",
        "/open-modify-encounter",
        "/modify-ecounter-type",
      ],
    },
    {
      name: "News & Features",
      path: "/news-and-features",
      icon: <NewsAndFeature />,
      activePaths: ["/news-and-features", "/create-news-feature"],
    },
    {
      name: "Report System",
      path: "/report-system",
      icon: <ReportManagement />,
      activePaths: ["/report-system"],
    },
    {
      name: "Record Management Admin",
      path: "/record-management-admin",
      icon: <RecourdManagement />,
      activePaths: ["/record-management-admin"],
    },
  ];

  const superadminLinks = [
    {
      name: "Dashboard",
      path: "/super-admin-dashboard",
      icon: <Dashboard />,
      activePaths: ["/super-admin-dashboard"],
    },
    {
      name: "Company",
      path: "/company",
      icon: <Company />,
      activePaths: ["/company", "/add-new-consents", "/create-new-company"],
    },
    {
      name: "Consent",
      path: "/consent",
      icon: <ConsentSetupIcon />,
      activePaths: ["/consent", "/consent-statement-information"],
    },
    {
      name: "Participant",
      path: "/participant",
      icon: <Participant />,
      activePaths: ["/participant", "/create-new-participant"],
    },
    {
      name: "Encounters",
      path: "/encounters",
      icon: <Encounter />,
      activePaths: [
        "/encounters",
        "/add-new-encounter",
        "/open-modify-encounter",
        "/modify-ecounter-type",
      ],
    },
    {
      name: "News & Features",
      path: "/news-and-features",
      icon: <NewsAndFeature />,
      activePaths: ["/news-and-features", "/create-news-feature"],
    },
    {
      name: "Report System",
      path: "/report-system",
      icon: <ReportManagement />,
      activePaths: ["/report-system"],
    },
    {
      name: "User Management Setup",
      path: "/user-management-setup",
      icon: <RecourdManagement />,
      activePaths: ["/user-management-setup", "/create-new-user"],
    },
  ];

  // Admin has same links as superadmin, but dashboard route differs
  const adminLinks = superadminLinks.map((link) =>
    link.name === "Dashboard"
      ? { ...link, path: "/admin-dashboard", activePaths: ["/admin-dashboard"] }
      : link
  );

  // 👉 Shared (Mobile)
  const mobileLinks = [
    ...(role === "superadmin"
      ? superadminLinks
      : role === "admin"
      ? adminLinks
      : role === "healthcoaches"
      ? healthcoachesLinks
      : superadminLinks), // Fallback to superadmin links
    {
      name: "Settings",
      path: "/settings",
      icon: <Setting />,
      activePaths: ["/settings"],
    },
  ];

  // ✅ Render Sidebar Menu Items
  const renderMenuItems = (items) => (
    <nav className="sidebar-navigation">
      <span className="aa-text-sm text-white fw-medium mb-11 d-block">
        Main Menu
      </span>
      <ul className="list-unstyled m-0">
        {items.map((item, index) => {
          const isActive = item.activePaths.some((path) =>
            location.pathname.startsWith(path)
          );
          return (
            <li key={index} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center py-10 px-12 mb-16 aa-text-sm fw-medium ${
                  isActive ? "active" : ""
                }`}
                onClick={closeSidebar}
              >
                <span
                  className="d-flex justify-content-center align-items-center"
                  style={{ width: "24px", height: "24px" }}
                >
                  {item.icon}
                </span>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* ✅ Desktop Sidebar */}
      <aside className="sidebar-wrapper d-none d-lg-flex flex-column justify-content-between">
        <div className="sidebar-header py-28 d-flex justify-content-center">
          <Image
            src={logo}
            alt="Wellness Workdays"
            width={115}
            fluid
            loading="lazy"
          />
        </div>
        <div className="scrollable-sidebar d-flex flex-column justify-content-between pb-30 pt-24 px-22">
          {role === "healthcoaches"
            ? renderMenuItems(healthcoachesLinks)
            : role === "superadmin"
            ? renderMenuItems(superadminLinks)
            : role === "admin"
            ? renderMenuItems(adminLinks)
            : renderMenuItems(superadminLinks)}{" "}
          {/* Fallback to superadmin links */}
          <div className="sidebar-bottom border-top border-secondary pt-15">
            <ul className="list-unstyled mb-0">
              <li
                className="nav-item d-flex align-items-center justify-content-between cursor-pointer aa-text-base fw-medium"
                onClick={handleLogout}
              >
                <div className="d-flex align-items-center gap-2">
                  <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg-transparent">
                    <UserIcon size={30} color="#FFFFFF" />
                  </span>
                  <span className="text-white small">
                    {auth?.first_name + " " + auth?.last_name || "User"}
                  </span>
                </div>
                <Logout />
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* ✅ Mobile Header */}
      <div className="mobile-header p-15 d-flex align-items-center justify-content-between d-lg-none">
        <Link to="/" className="logo d-flex align-items-center">
          <Image
            src={logo}
            alt="Wellness Workdays"
            width={115}
            fluid
            loading="lazy"
          />
        </Link>
        <button
          className="bg-transparent border-0 p-0"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <Toggle />
        </button>
      </div>

      {/* ✅ Mobile Sidebar */}
      <div
        className={`mobile-dashboard-sidebar d-lg-none ${
          burgerSidebarActive ? "active" : ""
        }`}
      >
        <button
          className="close cursor-pointer border rounded-circle d-flex align-items-center justify-content-center"
          onClick={toggleSidebar}
          aria-label="Close menu"
        >
          <Plus />
        </button>
        <div className="scrollable-sidebar d-flex flex-column justify-content-between py-30 px-22">
          {renderMenuItems(mobileLinks)}
          <div className="sidebar-bottom border-top border-secondary pt-15">
            <ul className="list-unstyled mb-0">
              <li
                className="nav-item d-flex align-items-center justify-content-between cursor-pointer aa-text-base fw-medium"
                onClick={handleLogout}
              >
                <div className="d-flex align-items-center gap-2">
                  <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg-transparent">
                    <UserIcon size={30} color="#FFFFFF" />
                  </span>
                  <span className="text-white small">
                    {auth?.first_name + " " + auth?.last_name || "User"}
                  </span>
                </div>
                <Logout />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(DashboardSidebar);
