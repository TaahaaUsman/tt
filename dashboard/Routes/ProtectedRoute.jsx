import React from "react";
import { Outlet } from "react-router-dom";

// Authentication removed - all routes are now accessible
const ProtectedRoute = () => {
  // Bypass all authentication checks - allow access to all components
  return <Outlet />;
};

export default ProtectedRoute;
