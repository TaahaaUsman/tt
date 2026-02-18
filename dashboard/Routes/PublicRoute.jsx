import React from "react";
import { Outlet } from "react-router-dom";

// Authentication removed - public routes are now accessible without redirects
const PublicRoute = () => {
  // Bypass all authentication checks - allow access
  return <Outlet />;
};

export default PublicRoute;
