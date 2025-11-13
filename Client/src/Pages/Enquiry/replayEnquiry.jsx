import { useState } from "react";
import { enquiryReplay } from "../../services/adminService";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export default function ReplayEnquiry() {

    const [response, setResponse] = useState([]);
    const { id } = useParams();
    console.log(id)

    async function instituteReplay() {
        const use = await enquiryReplay(id, response)
        console.log(use.data)
        setResponse(use.data)
        toast("replay send successfully")
        //alert("successfully")

    }


    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            {/* Header Section */}
            <div className=" bg-[#55a13b]  px-6 py-4">
                <div className="flex items-center space-x-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white">Institute Response</h3>
                        <p className="text-pink-100 text-sm mt-1">Craft your professional reply</p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="p-6 md:p-8">
                {/* Character Counter */}
                <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-semibold text-gray-700">
                        Your Response
                    </label>
                    <span className={`text-xs font-medium ${response.length > 500 ? 'text-red-500' : 'text-gray-500'
                        }`}>
                        {response.length}/500
                    </span>
                </div>

                {/* Textarea */}
                <div className="relative mb-6">
                    <textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Write your professional reply here... Please ensure your response is clear, helpful, and maintains the institute's standards."
                        rows={5}
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none resize-none transition-all duration-200 bg-gray-50/50 hover:bg-white text-gray-700 placeholder-gray-400 text-base leading-relaxed"
                    ></textarea>

                    {/* Decorative Corner */}
                    <div className="absolute bottom-3 right-3 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <button
                        onClick={instituteReplay}
                    >
                        <span> Response</span>
                    </button>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}