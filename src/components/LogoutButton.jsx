import { HiMiniArrowLeftStartOnRectangle } from "react-icons/hi2";

export default function LogoutButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-gray-700 px-4 py-2 rounded hover:bg-red-100 w-full"
    >
      <HiMiniArrowLeftStartOnRectangle className="text-red-600 h-5 w-5 mr-2" />
      Logout
    </button>
  );
}
