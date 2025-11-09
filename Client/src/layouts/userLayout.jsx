import { Outlet, useNavigate } from "react-router-dom";
//import { useState } from "react";
import Footer from "./Footer";
import { LogOut, LogIn } from "lucide-react";
const AdminLayout = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login')
    }
    const handleLogin = () => {
        navigate('/login')
    }



    return (
        <div className="body">

            <div className="header">
                <div className="flex flex-row flex-1 justify-between">
                    <h3 className="header-title">EduList</h3>
                    <div>
                        {userId ? (
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition cursor-pointer"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition cursor-pointer"
                            >
                                <LogIn className="w-5 h-5" />
                                Login
                            </button>
                        )}
                    </div>

                </div>
            </div >
            {/* Sidebar */}

            < Outlet />
            <Footer />

        </div >


    );
};
export default AdminLayout;