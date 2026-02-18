import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import DesktopTopbar from "../DesktopTopbar/DesktopTopbar";

const DashboardLayout = () => {
  return (
    <main>
      <DashboardSidebar />
      <DesktopTopbar />
      <div className="main-content">
        <div className="container-fluid gx-0">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
