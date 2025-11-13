import { useState } from "react";
import { useEffect } from "react";
import { enquiryList } from "../../services/adminService";
import { useParams } from "react-router-dom";
import { userName } from "../../services/userService";
import { getEnquiryReplay } from "../../services/adminService";
import { ToastContainer, toast } from 'react-toastify';

export default function EnquiryForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [form, setForm] = useState({});

    const [replay, setReplay] = useState([]);

    const userId = localStorage.getItem('user_id')
    const { id } = useParams();
    console.log(userId)
    const date = new Date();


    async function enquiryReplay() {
        const use = await getEnquiryReplay(id, userId)
        console.log(use.data.data)
        setReplay(use.data.data)
    }

    async function details() {
        let use = await userName();
        console.log(use.data.data)
        setName(use.data.data.name)
        setEmail(use.data.data.email)
        setPhone(use.data.data.phone)
    }

    const handleEnquiry = async (e) => {
        e.preventDefault()
        console.log('Handling the Response')
        const use = await enquiryList(userId, id, name, email, phone, subject, message, "pending", date)
        console.log(use.data)
        setForm(use.data)
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
        toast("Enquiry send successfully")
        enquiryReplay()
        //alert("Enquiry send successfully")
    }

    new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });


    useEffect(() => {
        details()
        enquiryReplay()
    }, []);

    return (

        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-8 px-4 sm:px-6 lg:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 💬 Left Side - Chat Section */}
                <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Enquiry Conversation</h2>

                    <div className="space-y-5 overflow-y-auto max-h-[500px] px-2">
                        {replay.map((info, index) => (
                            <div key={index} className="flex flex-col space-y-4">
                                {/* User Message (Left - Green) */}
                                <div className="flex items-start">
                                    {/* <div className="w-9 h-9 bg-gray-300 rounded-full mr-3 shadow-inner"></div> */}
                                    <div className="bg-green-200 text-gray-900 p-4 rounded-2xl rounded-tl-none max-w-[75%] shadow-md">
                                        <p className="font-semibold text-sm sm:text-base">{info.name}</p>
                                        <p className="text-xs sm:text-sm mt-1">{info.message}</p>
                                        <span className="text-[10px] text-gray-500 mt-1 block text-right">
                                            {new Date().toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Institute Reply (Right - Blue) */}
                                <div className="flex items-start justify-end">
                                    {/* <div className="w-9 h-9 bg-gray-300 rounded-full mr-3 shadow-inner"></div> */}
                                    {info.response ? (
                                        <div
                                            className="inline-block bg-blue-200 text-gray-900 px-3 py-2 rounded-2xl rounded-tl-none max-w-[75%] shadow-md"
                                        >
                                            <h3 className="font-semibold text-sm sm:text-base">Institute</h3>
                                            <p className="text-xs sm:text-sm mt-1">{info.response}</p>
                                            <span className="text-[10px] text-gray-500 mt-1 block text-right">
                                                {new Date().toLocaleString()}
                                            </span>
                                        </div>

                                    ) : (
                                        null
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 📝 Right Side - Enquiry Form */}
                <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
                    <h3 className="text-xl sm:text-2xl font-bold text-green-700 text-center mb-6">
                        Enquiry Form Details
                    </h3>

                    <form onSubmit={(e) => handleEnquiry(e, form)} className="space-y-4 sm:space-y-5">
                        <ToastContainer />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 sm:py-3 text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 sm:py-3 text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+91 98765 43210"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 sm:py-3 text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Course Enquiry / Service Request"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 sm:py-3 text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea
                                rows="4"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write your enquiry here..."
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 sm:py-3 text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-2xl hover:from-green-600 hover:to-green-700 transition-all duration-200"
                        >
                            Submit Enquiry
                        </button>
                    </form>
                </div>
            </div>
        </div>


    );
}
