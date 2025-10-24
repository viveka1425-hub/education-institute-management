import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";
import { LogOut, LogIn } from "lucide-react";
const AdminLayout = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');

    // console.log(userId);

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
                    <h3 className="header-title">Education Institute</h3>
                    <div>

                        {userId ? <LogOut onClick={handleLogout} className="cursor-pointer" /> : <LogIn onClick={handleLogin} />}

                    </div>
                </div>
            </div>
            {/* Sidebar */}

            <Outlet />
            <Footer />

        </div>


    );
};
export default AdminLayout;