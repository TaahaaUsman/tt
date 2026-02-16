// In dev with Vite proxy we use "" so /api goes to backend. In production set VITE_API_URL.
const API_BASE = import.meta.env.VITE_API_URL || "";

export const apiFetch = (path, options = {}) => {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  return fetch(url, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
  });
};
