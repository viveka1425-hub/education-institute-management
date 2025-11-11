import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";
import { LogOut } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
const AdminLayout = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };
    const handleLogout = () => {

        navigate('/login')
    }


    return (
        <div className="body">
            {/* Header */}
            <div className="header">
                <h3 className="header-title">EduList</h3>

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
                    <div style={styles.heading}>
                        <div style={{ textAlign: "center", padding: "15px" }}>
                            <FaUserCircle size={60} color="#ffffff" />
                            <h3 style={{ fontWeight: "bold", color: "#ffffff", marginRight: 30 }}>Admin Panel</h3>
                        </div>
                    </div>
                    <div>
                        <Link style={styles.Link} to="/adminDashboard">Dashboard</Link>
                        <Link style={styles.Link} to="/Admin">Institute</Link>
                        <Link style={styles.Link} to="/Requests">Requests</Link>
                        <Link style={styles.Link} to="/review">Reviews</Link>
                    </div>
                    <Link style={styles.LogOut} onClick={handleLogout} className="cursor-pointer">
                        <div className="flex flex-row">
                            <LogOut onClick={handleLogout} className="cursor-pointer" />
                            <div className="ml-1">Logout</div>
                        </div>
                    </Link>
                </div>

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

const styles = {
    heading: {
        backgroundColor: "#70c850ff",
        color: "white",
        fontFamily: "'Georgia', serif",
        fontSize: "18px",
        fontWeight: "bold",
        padding: "15px 18px",
        borderRadius: "6px",
        textAlign: "center",
        letterSpacing: "0.5px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)"
    },
    Link: {
        fontFamily: "'Georgia', serif",
        fontSize: "15px",
        fontWeight: "bold",
        color: "#2e7d32",
        textDecoration: "none",
        padding: "10px 15px",
        borderRadius: "5px",
        display: "block",
        marginBottom: "6px",
        transition: "all 0.3s ease",
    },
    logout: {
        fontFamily: "'Georgia', serif",
        fontSize: "15px",
        fontWeight: "bold",
        color: "#2e7d32"
    }
}
export default AdminLayout;