import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

/**
 * Public Layout - Marketing/Landing experience (no sidebar)
 * Used when user is NOT signed in.
 */
export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#fdfdfd]">
      <Navbar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
