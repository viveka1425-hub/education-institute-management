import { useState } from "react";
import { useEffect } from "react";
import { enquiryList } from "../../services/adminService";
import { useParams } from "react-router-dom";
import { userName } from "../../services/userService";
import { getEnquiryReplay } from "../../services/adminService";

export default function EnquiryForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [form, setForm] = useState({});
    const [replay, setReplay] = useState();

    const { id } = useParams();

    async function enquiryReplay() {
        const use = await getEnquiryReplay()
        console.log(use.data)
        setReplay(use.data)
    }

    async function details() {
        let use = await userName();
        console.log(use.data.data)
        setName(use.data.data.name)
        setEmail(use.data.data.email)
        setPhone(use.data.data.phone)
    }

    const userId = localStorage.getItem('user_id')
    console.log(userId)
    const date = new Date();


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
        //alert("Enquiry send successfully")
    }

    const notify = () => toast("");
    useEffect(() => {
        details()
        enquiryReplay()
    }, []);

    return (
        <div className="py-10 px-4 sm:px-8 bg-gray-50 min-h-screen">
            <div className="w-full lg:w-1/2 items-start pt-8 lg:pt-20">
                <div className="max-w-md mx-auto mt-6">
                    <div className="bg-gradient-to-r from-green-200 to-green-200 text-green rounded-2xl p-4 shadow-lg">
                        <h3 className="font-semibold text-lg mb-2">Institute Reply</h3>
                        <p className="text-sm leading-relaxed">{replay}</p>
                        <span className="text-xs text-green-20 mt-2 block text-right">— Institution Team</span>
                    </div>
                </div>
            </div>
            <div className="mt-0 ml-150">
                <div className="bg-green-50/70 p-5 sm:p-6 rounded-2xl border border-green-100 shadow-inner transition-all duration-300 hover:shadow-md max-w-xl mx-auto">
                    <h3 className="text-2xl font-bold text-green-800 text-center mb-6">
                        Customer Enquiry Form
                    </h3>

                    <form onSubmit={(e) => handleEnquiry(e, form)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Full Name */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-green-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    name="name" // Added name attribute for handleChange
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    className="w-full p-3 border border-green-200 rounded-2xl focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-green-700 mb-1">
                                    Email
                                </label>
                                <input
                                    name="email" // Added name attribute
                                    type="email" // Added type for better validation
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    className="w-full p-3 border border-green-200 rounded-2xl focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-green-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    name="phone" // Added name attribute
                                    type="tel" // Added type for better mobile input
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    className="w-full p-3 border border-green-200 rounded-2xl focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm"
                                    placeholder="+91 98765 43210"
                                    required
                                />
                            </div>

                            {/* Subject */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-green-700 mb-1">
                                    Subject
                                </label>
                                <input
                                    name="subject" // Added name attribute
                                    value={subject}
                                    onChange={(event) => setSubject(event.target.value)}
                                    className="w-full p-3 border border-green-200 rounded-2xl focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm"
                                    placeholder="Course Enquiry / Service Request"
                                    required
                                />
                            </div>

                            {/* Message (Converted from textarea) */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-green-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    // Used the styling from the original review textarea
                                    className="w-full p-3 border border-green-200 rounded-2xl focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm"
                                    rows="4"
                                    placeholder="Write your enquiry details here..."
                                    required
                                ></textarea>
                            </div>

                            {/* Submit Button (Styled like the original submit button) */}
                            <div className="md:col-span-2 mt-1">
                                <button onClick={notify}
                                    type="submit"
                                >
                                    Submit Enquiry
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}
