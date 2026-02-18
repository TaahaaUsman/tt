// Always hit backend: in dev same machine, in production set VITE_API_URL or VITE_BACKEND_URL.
const API_BASE =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:5001";

// For Google OAuth: must hit backend directly (same server that receives callback).
export const getBackendBase = () =>
  import.meta.env.VITE_BACKEND_URL || API_BASE || "http://localhost:5001";

const AUTH_TOKEN_KEY = "token";

export const getStoredToken = () => localStorage.getItem(AUTH_TOKEN_KEY);
export const setStoredToken = (token) => {
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
  else localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const apiFetch = (path, options = {}) => {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const token = getStoredToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return fetch(url, {
    ...options,
    credentials: "include",
    headers,
  });
};
