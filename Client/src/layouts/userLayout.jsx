import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";
import { LogOut, LogIn } from "lucide-react";
const AdminLayout = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const userId = localStorage.getItem('user_id');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login')
    }
    const handleLogin = () => {
        navigate('/login')
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    return (
        <div className="body">

            <div className="header">
                <div className="flex flex-row flex-1 justify-between">
                    <header className="shadow p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            {/* 🏫 Left: Title */}
                            <h3 className="header-title">Education Institute</h3>
                            {/* 🔍 Right: Search + Filters */}
                            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                                {/* Search Bar */}
                                <div className="relative w-full sm:w-68">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                                    />
                                    <svg
                                        className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                                        />
                                    </svg>
                                </div>

                                {/* Filter Section */}
                                <div className="flex flex-wrap justify-center md:justify-end gap-2">
                                    <select
                                        name="location"
                                        onChange={handleFilterChange}
                                        className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="">Location</option>
                                        <option value="chennai">Chennai</option>
                                        <option value="bangalore">Bangalore</option>
                                        <option value="mumbai">Mumbai</option>
                                    </select>

                                    <select
                                        name="fees"
                                        onChange={handleFilterChange}
                                        className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="">Fees</option>
                                        <option value="low">Below ₹50,000</option>
                                        <option value="medium">₹50,000–₹1,00,000</option>
                                        <option value="high">Above ₹1,00,000</option>
                                    </select>

                                    {/* <select
                                        name="facilities"
                                        onChange={handleFilterChange}
                                        className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="">Facilities</option>
                                        <option value="hostel">Hostel</option>
                                        <option value="library">Library</option>
                                        <option value="sports">Sports</option>
                                        <option value="lab">Laboratory</option>
                                    </select> */}

                                    {/* <select
                                        name="rating"
                                        onChange={handleFilterChange}
                                        className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="">Rating</option>
                                        <option value="5">⭐⭐⭐⭐⭐</option>
                                        <option value="4">⭐⭐⭐⭐</option>
                                        <option value="3">⭐⭐⭐</option>
                                        <option value="2">⭐⭐</option>
                                        <option value="1">⭐</option>
                                    </select> */}
                                </div>
                            </div>
                        </div>
                    </header>

                    <div>

                        {userId ? <LogOut onClick={handleLogout} className="cursor-pointer" /> : <LogIn onClick={handleLogin} />}

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
//<h3 className="header-title">Education Institute</h3>
