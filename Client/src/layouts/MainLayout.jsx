import { Outlet } from "react-router-dom";
import { useState } from "react";
import "../layouts/Header.css";
import Footer from "./Footer";
import { Link } from "react-router";



const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [coursesOpen, setCoursesOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };


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
                <div className={`sidebar ${sidebarOpen ? "open" : "mobile-hidden"}`}>
                    <a href="/Dashboard">Dashboard</a>

                    <div className="">
                        <a className="dropdown-btn" onClick={() => setCoursesOpen(!coursesOpen)}>
                            Profile Management
                            <span className="arrow">{coursesOpen ? "▲" : "▼"}</span> </a>

                        {coursesOpen && (
                            <div className="dropdown-content">
                                <Link to="Profile/ProfileView">profile details</Link>
                                <Link to="Courses/CoursesList">Courses</Link>
                                <Link to="Facilities/FacilitiesList">facilities</Link>
                            </div>
                        )}
                    </div>


                    <a href="/reviews"> reviews</a>
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


