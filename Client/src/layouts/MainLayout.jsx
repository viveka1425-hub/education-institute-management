import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../layouts/Header.css";
import Footer from "./Footer";
import { LogOut } from "lucide-react";

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [coursesOpen, setCoursesOpen] = useState(false);
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
                <h3 className="header-title">Education Institute</h3>



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
                        <Link to="/Dashboard">Dashboard</Link>

                        <div className="">
                            <a className="dropdown-btn" onClick={() => setCoursesOpen(!coursesOpen)}>
                                Profile Management
                                <span className="arrow">{coursesOpen ? "▲" : "▼"}</span> </a>

                            {coursesOpen && (
                                <div className="dropdown-content">
                                    <Link to="Profile/ProfileView">Profile details</Link>
                                    <Link to="Courses/CoursesList">Courses</Link>
                                    <Link to="Facilities/FacilitiesList">Facilities</Link>
                                </div>
                            )}
                        </div>
                        <Link to="/reviews/InstituteReview"> Reviews</Link>
                        <Link to ={`/Enquiry/enquiry/${id}`}>Enquiry</Link>
                    </div>
                    <Link onClick={handleLogout} className="cursor-pointer">
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

export default MainLayout;