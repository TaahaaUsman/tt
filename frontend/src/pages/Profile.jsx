import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../redux/slices/authSlice";
import { setStoredToken } from "../query/client";

const vu = "/assets/Images/vu.png";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setStoredToken(null);
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={user?.profilePicture || user?.profilePictureUrl || vu}
            alt=""
            className="w-24 h-24 rounded-full object-cover ring-2 ring-indigo-100"
          />
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900">{user?.name || "User"}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <div className="mt-2">
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                {user?.plan === "ultra_pro" ? "Ultra Pro" : user?.plan === "pro" ? "Pro" : "Free Plan"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-red-600 font-semibold hover:bg-red-50 border border-red-200 transition-colors"
        >
          <FiLogOut size={20} />
          Log out
        </button>
      </div>
    </div>
  );
}
