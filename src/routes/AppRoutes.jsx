import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import api from "../utils/api.js"

import ProtectedRoute from "../components/ProtectedRoute.jsx";

import Login from "../pages/Login/Login.jsx"
import Register from "../pages/Register/Register.jsx"
import Layout from "../components/Layout/Layout.jsx"
import Home from "../pages/Home/Home.jsx"
import Profile from "../pages/Profile/Profile.jsx"
import ProjectDetail from "../pages/ProjectDetail/ProjectDetail.jsx";

function AppContent() {
    const [user, setUser] = useState();
    const setUserStore = useAuthStore((state) => state.setUser);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
        if (isAuthPage) return;

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const response = await api.get("/api/auth/me");
                setUser(response.data.user);
                setUserStore(response.data.user);
            } catch (error) {
                console.error("Failed to fetch profile", error);
                navigate("/login", { replace: true });
            }
        };

        fetchUserProfile();
    }, [setUserStore, navigate, location]);

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes with Layout */}
            <Route
                element={
                    <ProtectedRoute>
                        <Layout name={user?.name} />
                    </ProtectedRoute>
                }
            >
                <Route path="/" element={<Home name={user?.name} email={user?.email} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/projects/:projectId" element={<ProjectDetail />} />
            </Route>
        </Routes>
    );
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}
