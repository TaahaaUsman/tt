import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import { setStoredToken } from "../query/client";
import { apiFetch } from "../query/client";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      setStoredToken(null);
      navigate(`/auth/login?error=${encodeURIComponent(error)}`, { replace: true });
      return;
    }

    if (token) {
      setStoredToken(token);
      apiFetch("/api/auth/getUser")
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((user) => {
          dispatch(setUser(user));
          navigate("/", { replace: true });
        })
        .catch(() => {
          setStoredToken(null);
          navigate("/auth/login?error=Session+invalid", { replace: true });
        });
      return;
    }

    navigate("/auth/login", { replace: true });
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <p className="text-gray-600">Signing you in...</p>
    </div>
  );
}
