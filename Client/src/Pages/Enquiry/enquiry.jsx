import { useEffect, useState } from "react";
import { getEnquiryList } from "../../services/adminService";
import { useNavigate, useParams } from "react-router-dom";

export default function Enquiry() {
    const [details, setDetails] = useState();
    const Navigate = useNavigate();

    const { id } = useParams();
    console.log(id)

    async function enquiryList() {
        const use = await getEnquiryList(id)
        console.log(id)
        console.log(use.data.data)
        setDetails(use.data.data)
    }

    function EnquiryChat(_id) {
        Navigate(`/replayEnquiry/${_id}`)
    }

    useEffect(() => {
        enquiryList()
    }, [])


    return (
        <div className="min-h-screen bg-green-50 py-10 px-6">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-green-700 text-center mb-10">
                    Customer Enquiries
                </h2>

                {details && details.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8">
                        {details.map((item, index) => (
                            <div
                                key={item._id || index}
                                className="group relative bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-green-200 hover:border-green-300 overflow-hidden"
                            >
                                {/* Decorative elements */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                                <div className="absolute -top-10 -right-10 w-20 h-20 bg-green-100 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

                                <div className="relative p-6 md:p-8">
                                    {/* Header with avatar and contact info */}
                                    <div className="flex items-start space-x-4 mb-6">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
                                                {item.name?.charAt(0)?.toUpperCase() || 'U'}
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-bold text-gray-800 truncate">
                                                {item.name}
                                            </h3>
                                            <div className="flex flex-col space-y-1 mt-2">
                                                <div className="flex items-center space-x-2 text-gray-600">
                                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="text-sm truncate">{item.email}</span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-gray-600">
                                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <span className="text-sm">{item.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Separator with icon */}
                                    <div className="flex items-center my-6">
                                        <div className="flex-1 border-t border-green-200"></div>
                                        <div className="mx-4">
                                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 border-t border-green-200"></div>
                                    </div>

                                    {/* Message content */}
                                    <div className="space-y-4">
                                        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                                </svg>
                                                <span className="font-semibold text-green-700 text-sm">Subject</span>
                                            </div>
                                            <p className="text-gray-700 text-sm md:text-base line-clamp-2">{item.subject}</p>
                                        </div>

                                        <div className="bg-white rounded-xl p-4 border border-green-100">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                </svg>
                                                <span className="font-semibold text-green-700 text-sm">Message</span>
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{item.message}</p>
                                        </div>
                                    </div>

                                    {/* Action button */}
                                    <div className="mt-6 md:mt-8 flex justify-end">
                                        <button
                                            onClick={() => EnquiryChat(item._id)}
                                            className="group relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold text-sm md:text-base hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                                        >
                                            <span>Respond Now</span>
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 md:py-24 px-4">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-12 h-12 md:w-16 md:h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-3 text-center">
                            No Enquiries Found
                        </h3>
                        <p className="text-gray-500 text-center max-w-md">
                            There are no enquiries to display at the moment. Check back later for new messages.
                        </p>
                        <div className="mt-6 text-4xl">💭</div>
                    </div>
                )}
            </div>
        </div>
    )
}