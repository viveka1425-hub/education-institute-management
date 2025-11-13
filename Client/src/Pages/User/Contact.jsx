import React from "react";
import Footer from "../../layouts/Footer";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 text-gray-800 py-16 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <h1 className="text-4xl font-bold text-green-800 text-center mb-6">
                    Contact EduList
                </h1>
                <p className="text-center text-gray-700 mb-12">
                    We're here to help you with any questions or support you may need.
                    Reach out to us anytime — we’d love to hear from you.
                </p>

                {/* Contact Details Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-16 text-center">
                    {/* Address */}
                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
                        <div className="text-4xl mb-4">📍</div>
                        <h2 className="text-2xl font-semibold text-green-700 mb-2">
                            Our Address
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            EduList HQ <br />
                            Mullick Bazar, <br />
                            Kolkata, West Bengal 700017
                        </p>
                    </div>

                    {/* Phone */}
                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
                        <div className="text-4xl mb-4">📞</div>
                        <h2 className="text-2xl font-semibold text-green-700 mb-2">
                            Call Us
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            +91 92097 30317 <br />
                            +91 90807 65432
                        </p>
                    </div>

                    {/* Email */}
                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all">
                        <div className="text-4xl mb-4">✉️</div>
                        <h2 className="text-2xl font-semibold text-green-700 mb-2">
                            Email Us
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            Brington@edulist.com <br />
                            info@edulist.com
                        </p>
                    </div>
                </div>

                {/* Map Section */}
                <div className="rounded-2xl overflow-hidden shadow-lg">
                    <iframe
                        title="EduList Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3291538970444!2d80.27071811480184!3d13.082680990772726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265de3b2f0c11%3A0x7cd42b403b893fb7!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1699443920941!5m2!1sen!2sin"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>

                {/* Footer Note */}
                <div className="text-center mt-12 text-gray-600">
                    <p>© {new Date().getFullYear()} EduList — Connecting Students & Institutes.</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
