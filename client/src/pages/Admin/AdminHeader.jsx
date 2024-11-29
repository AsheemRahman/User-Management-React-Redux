import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import { adminLogout } from "../../redux/admin/adminSlice";
import { useDispatch } from "react-redux";

export default function AdminHeader() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            let res = await fetch('/api/admin/signout', {
                method: 'POST',
                credentials: 'include',
            });
            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.message || "Invalid credentials");
                return;
            }
            const data = await res.json();
            if (data) {
                toast.success("SignOut successful");
                dispatch(adminLogout(false));
                navigate("/admin/login");
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
            console.error("sign out error:", error);
            toast.error("An error occurred during Sign out. Please try again.");
        }
    }

    return (
        <div className='bg-slate-200 h-16'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/admin/home'><h1 className='font-bold'>Admin</h1></Link>
                {location.pathname !== '/admin/login' && (
                    <button onClick={handleLogout} className='bg-red-600 text-white p-2 rounded-lg'>
                        Sign Out
                    </button>
                )}
            </div>
        </div>
    )
}
