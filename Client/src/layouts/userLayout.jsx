import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";
import { LogOut, LogIn, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const AdminLayout = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');
    const Role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login')
    }
    const handleLogin = () => {
        navigate('/login')
    }



    return (
        <div className="min-h-screen flex flex-col bg-[#f5f9f4]">
            {/* Header */}
            <header className=" shadow-md py-3 px-4 sm:px-8">
                <div className="flex justify-between items-center">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-green-800 ">EduList</h3>

                    {/* Hamburger icon (visible only on mobile) */}
                    <button
                        className="sm:hidden text-white focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                    {/* Desktop Navigation */}
                    {Role !== "admin" && (
                    <div className="hidden sm:flex items-center gap-4">
                        <Link to="/">Home</Link>
                        <Link style={{ marginLeft: 20, marginRight: 20 }} to="/About"> About Us </Link>
                        <Link style={{marginRight:20}} to="/Contact"> Contact </Link>
                        {/* Login / Logout */}
                        {userId ? (
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
                            >
                                <LogIn className="w-5 h-5" />
                                Login
                            </button>
                        )}
                    </div>
                    )}
                </div>

                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                    <div className="sm:hidden mt-4 flex flex-col items-center gap-3 bg-[#aad6a9] pb-4 animate-fadeIn">
                        <Link to="/">Home</Link>
                        <Link to="/About"> About Us </Link>
                        <Link to="/Contact"> Contact </Link>

                        {userId ? (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg w-40 transition"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    handleLogin();
                                    setMenuOpen(false);
                                }}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg w-40 transition"
                            >
                                <LogIn className="w-5 h-5" />
                                Login
                            </button>
                        )}
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>

    );
};
export default AdminLayout;