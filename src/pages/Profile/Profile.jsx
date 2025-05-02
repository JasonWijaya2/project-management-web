import { useEffect } from "react";
import useAuthStore from "../../stores/authStore";
import api from "../../utils/api";

export default function Profile() {
  const setUserStore = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/api/auth/me");
        setUserStore(response.data.user);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchUserProfile();
  }, [setUserStore]);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            {user ? (
              <p className="mt-1 text-lg">{user.name}</p>
            ) : (
              <div className="h-6 mt-1 bg-gray-200 rounded animate-pulse w-40" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            {user ? (
              <p className="mt-1 text-lg">{user.email}</p>
            ) : (
              <div className="h-6 mt-1 bg-gray-200 rounded animate-pulse w-64" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
