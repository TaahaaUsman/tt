import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import { apiFetch } from "../query/client";

export default function VerifyEmailPage() {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResendCode = async () => {
    const res = await apiFetch("/api/auth/resend-code", { method: "POST" });
    const result = await res.json();
    if (result.error) toast.error(result.error);
    else if (result.message) toast.success(result.message);
    else setError(result?.message || result?.error);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/auth/verify-email", {
        method: "POST",
        body: JSON.stringify({ code }),
      });
      const result = await res.json();
      setLoading(false);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      if (result.message) {
        toast.success(result.message);
        if (result.user) dispatch(setUser({ _id: result.user.id, name: result.user.name, email: result.user.email, profilePictureUrl: result.user.profilePicture }));
        navigate("/");
        return;
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">Verify Your Email</h2>
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-600">Verification Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter the code sent to your email"
            className="w-full text-gray-700 rounded-md border border-gray-300 px-4 py-2 focus:border-blue-400 focus:outline-none"
          />
        </div>
        <button onClick={handleSubmit} className="mb-4 w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600 transition">
          Verify Email
        </button>
        <p className="text-center text-sm text-gray-600">
          Wrong email? <Link to="/auth/register" className="font-semibold text-blue-500 hover:underline">register again</Link>
        </p>
        <p className="text-center text-sm text-gray-600">
          Did not get code? <button type="button" onClick={handleResendCode} className="font-semibold text-blue-500 hover:underline">resend code</button>
        </p>
        {error && <div className="w-full flex justify-center items-center mt-4 text-sm text-red-500"><span>{error}</span></div>}
      </div>
    </div>
  );
}
