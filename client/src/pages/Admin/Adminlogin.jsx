import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../redux/admin/adminSlice";

export default function Adminlogin() {
    const [loginDetails, setLoginDetails] = useState({
        username: "",
        password: "",
    });
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        try {
            if (!loginDetails.username || !loginDetails.password) {
                toast.error("Both fields are required");
                return;
            }

            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginDetails),
            });

            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.message || "Invalid credentials");
                return;
            }

            const data = await res.json();
            if (data) {
                toast.success("Login successful");
                dispatch(adminLogin(true));
                navigate("/admin/home");
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An error occurred during login. Please try again.");
        }
    };

    return (
        <>
            <AdminHeader />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form
                    onSubmit={handleAdminLogin}
                    className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm"
                >
                    <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                        Admin Login
                    </h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="border border-gray-300 w-full p-3 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            value={loginDetails.username}
                            onChange={(e) =>
                                setLoginDetails({
                                    ...loginDetails,
                                    username: e.target.value,
                                })
                            }
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            className="border border-gray-300 w-full p-3 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            value={loginDetails.password}
                            onChange={(e) =>
                                setLoginDetails({
                                    ...loginDetails,
                                    password: e.target.value,
                                })
                            }
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-lg py-3 text-lg font-semibold hover:bg-blue-600 transition-all"
                    >
                        Login
                    </button>
                </form>
            </div>
        </>
    );
}
