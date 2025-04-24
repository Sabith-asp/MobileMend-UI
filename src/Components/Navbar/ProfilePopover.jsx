import { useState } from "react";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { MdEngineering } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { checkAuth, logout } from "@/Api/authApi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/Redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { clearUser, setUser } from "@/Redux/Slices/userSlice";

export default function ProfilePopover() {
  const [showPopover, setShowPopover] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggingOut = async () => {
    try {
      const response = await logout();
      console.log(response);
      dispatch(logOut());
      dispatch(clearUser());
      toast.success(response?.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => setShowPopover(true)}
      onMouseLeave={() => setShowPopover(false)}
    >
      {/* Profile button */}
      <button className="btn-primary-rounded text-xs ml-3 font-normal flex items-center gap-2 hover:bg-blue-600 transition duration-200">
        <FiUser className="text-base font-bold" />
      </button>

      {/* Popover */}
      <AnimatePresence>
        {showPopover && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-xl border border-gray-200 z-50"
          >
            <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-200">
              {/* Profile icon */}
              <FiUser className="text-xl text-gray-700" />
              {/* Profile name and role */}
              <div>
                <span className="block text-sm font-medium text-gray-800">
                  {user?.name}
                </span>
                <span className="block text-xs text-gray-500">
                  {user?.role}
                </span>
              </div>
            </div>
            <ul className="text-sm text-gray-700 divide-y divide-gray-100">
              <li className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out">
                <FiSettings className="text-gray-600" />
                <span>Settings</span>
              </li>
              {user?.role !== "Technician" && (
                <li
                  onClick={() => navigate("/become-technician")}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out"
                >
                  <MdEngineering className="text-gray-600" />
                  <span>Become Technician</span>
                </li>
              )}
              <li
                onClick={() => loggingOut()}
                className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 cursor-pointer text-red-500 transition duration-150 ease-in-out"
              >
                <FiLogOut className="text-red-500" />
                <span>Log Out</span>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
