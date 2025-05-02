import { useState } from "react";
import LogoutButton from "../LogoutButton";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

export default function Topbar({ name }) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const avatar = name?.charAt(0).toUpperCase() || "?";
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="bg-white flex flex-row justify-between shadow px-6 py-4 relative">
      <div className="text-lg font-semibold">Dashboard</div>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center focus:outline-none"
        >
          {/* Avatar icon or initials */}
          <span className="text-sm font-bold text-white">{avatar}</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50 py-2">
            <div className="flex flex-col items-center space-y-2">
              <button
                onClick={() => {
                  navigate("/profile")
                }}
                className="text-gray-700 px-4 py-2 hover:bg-gray-100 w-full text-center"
              >
                Profile
              </button>
              <div className="text-center">
                <LogoutButton onClick={logout} />
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
