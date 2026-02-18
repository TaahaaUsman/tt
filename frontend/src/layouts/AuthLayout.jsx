import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthLayout() {
  const user = useSelector((state) => state.auth.user);

  // Logged-in users visiting /auth/* get redirected to home (dashboard)
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
