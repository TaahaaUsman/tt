import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardTopbar from "../components/DashboardTopbar";

/**
 * Dashboard Layout - App-style (dashboard folder aesthetic)
 * Dark sidebar + topbar, no public Navbar
 */
export default function DashboardLayout() {
  useEffect(() => {
    document.body.classList.add("dashboard-active");
    return () => document.body.classList.remove("dashboard-active");
  }, []);

  return (
    <main className="min-h-screen bg-[#f6f8fa]">
      <DashboardSidebar />
      <DashboardTopbar />
      <div className="dashboard-main">
        <Outlet />
      </div>
    </main>
  );
}
