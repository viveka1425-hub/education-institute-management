import { useEffect, useState } from "react";
import { reviewListInstitute } from "../../services/adminService";
import { rejectedReview } from "../../services/adminService";
import { ToastContainer, toast } from 'react-toastify';

export default function Review() {
    const [reviews, setReviews] = useState([]);
    const instituteId = localStorage.getItem('institute_id')
    console.log(reviews)

    async function adminConclusion() {
        const use = await reviewListInstitute(instituteId)
        console.log(use.data)
        setReviews(use.data.userReviewDetails)

    }
    async function handleReject(_id) {
        await rejectedReview(_id);
        await adminConclusion()
        toast("Flag successfully")
        //alert("rejected successfully")

    }
    useEffect(() => {
        adminConclusion()
    }, [])

    return (
        <div className="min-h-screen py-10 px-6">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-green-700 text-center mb-10">
                    Customer Reviews
                </h2>
                {(reviews ?? []).length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        {reviews.slice(-2).map((userReviewDetails, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100"
                            >
                                {/* Animated Gradient Border */}
                                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>

                                <div className="relative bg-white rounded-3xl m-0.5 h-full">
                                    {/* Header Section */}
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mr-3 shadow-lg">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h2 className="text-lg font-bold text-gray-900">Recent Review</h2>
                                                    <p className="text-sm text-gray-600">Customer feedback</p>
                                                </div>
                                            </div>
                                            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-3 py-1 border border-green-200">
                                                <span className="text-xs font-medium text-green-700">#{reviews.length - index}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="p-6">
                                        {/* User Info and Rating */}
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mr-4 border border-green-200">
                                                    <span className="text-lg font-bold text-green-700">
                                                        {userReviewDetails.userId?.name?.charAt(0) || "A"}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900">
                                                        {userReviewDetails.userId?.name || "Anonymous User"}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">Verified Reviewer</p>
                                                </div>
                                            </div>

                                            {/* Rating Badge */}
                                            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl px-4 py-2 shadow-lg">
                                                <div className="flex items-center">
                                                    <span className="text-white font-bold text-lg mr-1">⭐</span>
                                                    <span className="text-white font-bold text-lg">{userReviewDetails.rating}</span>
                                                    <span className="text-white/80 text-sm ml-1">/5</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Review Text */}
                                        <div className="relative mb-6">
                                            <div className="absolute -left-2 top-0 text-4xl text-green-200 font-serif">"</div>
                                            <p className="text-gray-700 leading-relaxed text-lg pl-6 pr-2 italic">
                                                {userReviewDetails.reviewText}
                                            </p>
                                            <div className="absolute -right-2 bottom-0 text-4xl text-green-200 font-serif rotate-180">"</div>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center text-gray-500">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-sm">
                                                    {new Date(userReviewDetails.date).toLocaleString("en-US", {
                                                        weekday: "short",
                                                        month: "short",
                                                        day: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    })}
                                                </span>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleReject(userReviewDetails._id)}
                                                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    Flag
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Corner Accents */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-3xl"></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-3xl"></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-3xl"></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-br-3xl"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-200 max-w-md mx-auto">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">⭐</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Reviews Yet</h3>
                            <p className="text-gray-600">Be the first to share your experience!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}