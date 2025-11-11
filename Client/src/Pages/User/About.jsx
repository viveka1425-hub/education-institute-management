import React from "react";

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 text-gray-800">
            <div className="max-w-5xl mx-auto px-6 py-16">
                {/* Header Section */}
                <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
                    About EduList
                </h1>

                {/* Intro Paragraph */}
                <p className="text-lg text-center mb-10 text-gray-700 leading-relaxed">
                    EduList is a comprehensive education listing and review platform
                    designed to help students and parents discover, compare, and review
                    educational institutions such as schools, colleges, coaching centers,
                    and preschools. Our mission is to make finding the right institute
                    simple, transparent, and accessible to everyone.
                </p>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-md">
                        <h2 className="text-2xl font-semibold text-green-700 mb-4">
                            🎯 Our Mission
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            To empower learners by providing a trusted space to explore and
                            review educational institutions. We aim to bridge the gap between
                            students and institutes through verified listings, user feedback,
                            and transparent information.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-md">
                        <h2 className="text-2xl font-semibold text-green-700 mb-4">
                            🌱 Our Vision
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            To become the most reliable global platform for educational
                            discovery — where every student finds the best path for their
                            learning journey, and every institute gets recognized for quality
                            education.
                        </p>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-semibold text-green-800 text-center mb-6">
                        Why Choose EduList?
                    </h2>
                    <ul className="grid md:grid-cols-2 gap-6">
                        <li className="bg-white p-6 rounded-xl shadow-sm">
                            ✅ Verified institute listings with accurate details
                        </li>
                        <li className="bg-white p-6 rounded-xl shadow-sm">
                            💬 Real user reviews and transparent ratings
                        </li>
                        <li className="bg-white p-6 rounded-xl shadow-sm">
                            🧭 Easy search and filter options for institutes
                        </li>
                        <li className="bg-white p-6 rounded-xl shadow-sm">
                            👩‍🏫 Platform for institutes to manage profiles and visibility
                        </li>
                    </ul>
                </div>

                {/* Footer Section */}
                <div className="text-center mt-16 text-gray-600">
                    <p>© {new Date().getFullYear()} EduList — All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
