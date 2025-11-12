import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../layouts/Header.css";
import Footer from "./Footer";
import { LogOut } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    //const [coursesOpen, setCoursesOpen] = useState(false);
    const navigate = useNavigate();
    const id = localStorage.getItem('institute_id')

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login')
    }

    return (
        <div className="body">
            {/* Header */}
            <div className="header">
                <h3 className="header-title">EduList</h3>



                {/* Hamburger */}
                <div className="hamburger text-green-700" onClick={toggleSidebar}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <div className="main-body">
                {/* Sidebar */}
                <div className={`sidebar ${sidebarOpen ? "open" : "mobile-hidden"} flex justify-between flex-col`}>
                    <div>
                        <div className="flex flex-col items-center justify-center text-white bg-[#8dc78b] h-40 rounded-2xl shadow-lg">
                            <FaUserCircle size={60} color="#ffffff" />
                            <h3 className="mt-2 text-white text-lg font-semibold">Institute</h3>
                        </div>
                        <Link style={styles.Link} to="/Dashboard">Dashboard</Link>

                        <div style={styles.Link}>
                            {/* <a className="dropdown-btn" onClick={() => setCoursesOpen(!coursesOpen)}> */}
                            Profile Management
                            {/* <span className="arrow">{coursesOpen ? "▲" : "▼"}</span> </a> */}


                            <div className="dropdown-content mt-3">
                                <Link style={styles.Link} to="Profile/ProfileView">Profile details</Link>
                                <Link style={styles.Link} to="Courses/CoursesList">Courses</Link>
                                <Link style={styles.Link} to="Facilities/FacilitiesList">Facilities</Link>
                            </div>
                        </div>
                        <Link style={styles.Link} to="/reviews/InstituteReview"> Reviews</Link>
                        <Link style={styles.Link} to={`/Enquiry/enquiry/${id}`}>Enquiry</Link>
                    </div>
                    <Link style={styles.logout} onClick={handleLogout} className="cursor-pointer">
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
        color: "#2e7d32",
        marginTop: 50
    }
};


export default MainLayout;