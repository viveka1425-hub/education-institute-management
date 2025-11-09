import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function InstituteBanner() {
    const [showAbout, setShowAbout] = useState(false);
    return (
        <div>
            <div className="relative bg-gradient-to-br from-[#55823d] via-[#6fae4b] to-[#8ed174] text-white py-6 px-6 text-center overflow-hidden rounded-3xl shadow-2xl">
                {/* Subtle floating circles for richness */}
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-16 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
                        Every great journey begins with <span className="text-[#e6ffda]">education</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-green-50 font-medium tracking-wide">
                        Your educational journey starts here.
                    </p>

                    {/* Decorative line */}
                    <div className="mt-6 w-32 h-1 bg-white/60 mx-auto rounded-full"></div>
                    <button style={{ backgroundColor: "white", color: "#305921", marginTop: 10, marginRight: 10 }}>
                        <Link to="#">Home</Link>
                    </button>
                    <button style={{ backgroundColor: "white", color: "#305921", marginTop: 10, marginRight: 10, marginLeft: 10 }}>
                        <Link to="/login">Login</Link>
                    </button>
                    <button style={{ backgroundColor: "white", color: "#305921", marginTop: 10 }}>
                        <Link to="/Register">Register</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}