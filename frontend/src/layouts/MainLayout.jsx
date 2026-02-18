import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PublicLayout from "./PublicLayout";
import DashboardLayout from "./DashboardLayout";

/**
 * Switches layout based on auth:
 * - Guest: PublicLayout (no sidebar, marketing style)
 * - Logged in: DashboardLayout (sidebar, app style)
 */
export default function MainLayout() {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    return <DashboardLayout />;
  }

  return <PublicLayout />;
}
