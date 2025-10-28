import { useState } from "react";
import { enquiryList } from "../../services/adminService";
import { useParams } from "react-router-dom";

export default function EnquiryForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("")
    const [form, setForm] = useState({})


    const userId = localStorage.getItem('user_id')
    console.log(userId)
    const { id } = useParams()
    console.log(id)
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
        alert("Enquiry send successfully")
    }

    return (
        <div className="bg-pink-50/70 p-5 sm:p-6 rounded-2xl mb-8 border border-pink-100 shadow-inner transition-all duration-300 hover:shadow-md max-w-xl mx-auto">
            <h3 className="text-2xl font-bold text-pink-800 text-center mb-6">
                Customer Enquiry Form
            </h3>

            <form onSubmit={(e) => handleEnquiry(e, form)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-pink-700 mb-1">
                            Full Name
                        </label>
                        <input
                            name="name" // Added name attribute for handleChange
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="w-full p-3 border border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-pink-700 mb-1">
                            Email
                        </label>
                        <input
                            name="email" // Added name attribute
                            type="email" // Added type for better validation
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full p-3 border border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm"
                            placeholder="name@example.com"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-pink-700 mb-1">
                            Phone Number
                        </label>
                        <input
                            name="phone" // Added name attribute
                            type="tel" // Added type for better mobile input
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            className="w-full p-3 border border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm"
                            placeholder="+91 98765 43210"
                            required
                        />
                    </div>

                    {/* Subject */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-pink-700 mb-1">
                            Subject
                        </label>
                        <input
                            name="subject" // Added name attribute
                            value={subject}
                            onChange={(event) => setSubject(event.target.value)}
                            className="w-full p-3 border border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm"
                            placeholder="Course Enquiry / Service Request"
                            required
                        />
                    </div>

                    {/* Message (Converted from textarea) */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-pink-700 mb-1">
                            Message
                        </label>
                        <textarea
                            name="message"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            // Used the styling from the original review textarea
                            className="w-full p-3 border border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm"
                            rows="4"
                            placeholder="Write your enquiry details here..."
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button (Styled like the original submit button) */}
                    <div className="md:col-span-2 mt-1">
                        <button
                            type="submit"
                        >
                            Submit Enquiry
                        </button>
                    </div>
                </div>
            </form>
        </div>

    );
}
