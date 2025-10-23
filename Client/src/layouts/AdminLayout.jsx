import { Outlet } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";
import { LogOut } from "lucide-react";
const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };
    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
    }


    return (
        <div className="body">
            {/* Header */}
            <div className="header">
                <h3 className="header-title">Education Institute</h3>

                {/* Hamburger */}
                <div className="hamburger" onClick={toggleSidebar}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <div className="main-body">
                {/* Sidebar */}
                <div className={`sidebar ${sidebarOpen ? "open" : "mobile-hidden"} flex justify-between flex-col`}>
                    <div>
                        <a href="/Admin">Dashboard</a>
                        <a href="/Requests">Requests</a>
                    </div>
                </div>
                <a onClick={handleLogout} className="cursor-pointer">
                    <div className="flex flex-row">
                        <LogOut onClick={handleLogout} className="cursor-pointer" />
                        <div className="ml-1">Logout</div>
                    </div>
                </a>

                {/* Overlay */}
                {sidebarOpen && <div className="overlay show" onClick={closeSidebar}></div>}

                {/* Main content */}

                <div className="main-content">
                    <Outlet />
                    <Footer />
                </div>

            </div>
        </div>
    );
};
export default AdminLayout;