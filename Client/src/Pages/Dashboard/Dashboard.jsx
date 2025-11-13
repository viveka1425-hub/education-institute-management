import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { userName } from "../../services/userService";
import './Dashboard.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getCount } from "../../services/adminService";
import { reviewListInstitute } from "../../services/adminService";
import { getEnquiryList } from "../../services/adminService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { getReviewChart } from "../../services/adminService";
import { getEnquiryChart } from "../../services/adminService";
//import { userName } from "../../services/adminService";

const Dashboard = () => {
    const [name, setName] = useState("");
    const [count, setCount] = useState([]);
    const [enquiryCount, setEnquiryCount] = useState([]);
    const [instituteCount, setInstituteCount] = useState([]);
    const [reviewList, setReviewList] = useState([]);
    const [enquiryList, setEnquiryList] = useState([]);
    const [reviewChartList, setReviewChartList] = useState([]);
    const [enquiryChartList, setEnquiryChartList] = useState([]);

    const id = localStorage.getItem('institute_id')
    const Role = localStorage.getItem("role");


    async function enquiryChart() {
        let use = await getEnquiryChart(id);
        console.log(use.data.data)
        setEnquiryChartList(use.data.data)
    }
    async function reviewChart() {
        let use = await getReviewChart(id);
        console.log(use.data)
        setReviewChartList(use.data)
    }

    async function showName() {
        let use = await userName();
        console.log(use.data.data.name)
        setName(use.data.data.name)
    }

    async function reviewCount() {
        const use = await getCount(id)
        console.log(use)
        setCount(use.data.result)
        setEnquiryCount(use.data.enquiry)
        setInstituteCount(use.data.institute)
    }

    async function getReviewCountForAdmin() {
        const use = await getCount()
        console.log(use)
    }
    async function resendReviews() {
        const use = await reviewListInstitute(id)
        console.log(use.data.userReviewDetails)
        setReviewList(use.data.userReviewDetails)
    }
    async function resendEnquiry() {
        const use = await getEnquiryList(id)
        console.log(use)
        setEnquiryList(use.data.data)
    }

    useEffect(() => {
        showName()
        reviewCount()
        resendReviews()
        getReviewCountForAdmin()
        resendEnquiry()
        reviewChart()
        enquiryChart()
    }, []);


    return (
        <div>
            <div>
                <h2 className="text-4xl sm:text-4xl font-extrabold text-green-700 tracking-tight mb-4">
                    Welcome! {name}
                </h2>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                {/* Total Review Card */}
                <div className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100">
                    {/* Animated Gradient Border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>

                    <div className="relative bg-white rounded-3xl m-0.5 h-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Total Reviews</h3>
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <span className="text-xl">⭐</span>
                            </div>
                        </div>

                        <div className="flex items-end justify-between">
                            <div className="text-4xl font-bold text-gray-900">{count}</div>
                            <div className="text-sm text-gray-500 font-medium">Reviews</div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${Math.min((count / 100) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-3xl"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-3xl"></div>
                </div>

                {/* Total Institutes Card - Admin Only */}
                {Role === 'admin' && (
                    <div className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        {/* Animated Gradient Border */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>

                        <div className="relative bg-white rounded-3xl m-0.5 h-full p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-800">Total Institutes</h3>
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-xl">🏬</span>
                                </div>
                            </div>

                            <div className="flex items-end justify-between">
                                <div className="text-4xl font-bold text-gray-900">{instituteCount}</div>
                                <div className="text-sm text-gray-500 font-medium">Institutes</div>
                            </div>

                            {/* Stats Indicator */}
                            <div className="mt-4 flex items-center text-sm text-gray-600">
                                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                </svg>
                                <span>Active institutes</span>
                            </div>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-3xl"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-3xl"></div>
                    </div>
                )}

                {/* Total Enquiries Card - Non-Admin */}
                {Role !== 'admin' && (
                    <div className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        {/* Animated Gradient Border */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>

                        <div className="relative bg-white rounded-3xl m-0.5 h-full p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-800">Total Enquiries</h3>
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-xl">👩‍💻</span>
                                </div>
                            </div>

                            <div className="flex items-end justify-between">
                                <div className="text-4xl font-bold text-gray-900">{enquiryCount}</div>
                                <div className="text-sm text-gray-500 font-medium">Enquiries</div>
                            </div>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-3xl"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-3xl"></div>
                    </div>
                )}
            </div>

            <div className="w-full min-h-screen flex justify-center items-center md:-mt-10 -mb-5">
                <div
                    className={`grid gap-6 justify-items-center w-full max-w-6xl 
      ${Role !== 'admin' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}
                >
                    {/* Review Count Chart */}
                    <div className="w-full md:w-[90%] lg:w-[95%] group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                        <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 border-b border-green-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center shadow-sm">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-800">Review Analytics</h3>
                                        <p className="text-xs text-gray-600">Weekly performance</p>
                                    </div>
                                </div>
                                <span className="bg-white/80 text-xs font-medium text-gray-700 px-2 py-1 rounded-md border border-green-200">
                                    This Week
                                </span>
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="w-full h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={reviewChartList} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="reviewGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                                                <stop offset="100%" stopColor="#059669" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" vertical={false} />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
                                        <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                fontSize: '12px',
                                                padding: '8px 12px'
                                            }}
                                            cursor={{ fill: 'rgba(16, 185, 129, 0.05)' }}
                                        />
                                        <Bar dataKey="reviews" fill="url(#reviewGradient)" radius={[6, 6, 0, 0]} barSize={20} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Summary */}
                            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
                                <div className="text-center">
                                    <div className="text-lg font-bold text-gray-900">
                                        {reviewChartList.reduce((sum, day) => sum + day.reviews, 0)}
                                    </div>
                                    <div className="text-xs text-gray-500 font-medium">Total</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-gray-900">
                                        {Math.max(...reviewChartList.map(day => day.reviews))}
                                    </div>
                                    <div className="text-xs text-gray-500 font-medium">Peak</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-bold text-gray-900">
                                        {(reviewChartList.reduce((sum, day) => sum + day.reviews, 0) / reviewChartList.length).toFixed(1)}
                                    </div>
                                    <div className="text-xs text-gray-500 font-medium">Avg/Day</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enquiry Chart — only for non-admins */}
                    {Role !== 'admin' && (
                        <div className="w-full md:w-[90%] lg:w-[95%] group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                            <div className="relative bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3 border-b border-blue-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-800">Enquiry Analytics</h3>
                                            <p className="text-xs text-gray-600">Recent trends</p>
                                        </div>
                                    </div>
                                    <span className="bg-white/80 text-xs font-medium text-gray-700 px-2 py-1 rounded-md border border-blue-200">
                                        Latest
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="w-full h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={enquiryChartList} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="enquiryGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                                                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity={1} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="2 2" stroke="#f3f4f6" vertical={false} />
                                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
                                            <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'white',
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                    fontSize: '12px',
                                                    padding: '8px 12px'
                                                }}
                                                cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                                            />
                                            <Bar dataKey="count" fill="url(#enquiryGradient)" radius={[6, 6, 0, 0]} barSize={20} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Summary */}
                                <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-900">
                                            {enquiryChartList.reduce((sum, item) => sum + item.count, 0)}
                                        </div>
                                        <div className="text-xs text-gray-500 font-medium">Total</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-900">
                                            {Math.max(...enquiryChartList.map(item => item.count))}
                                        </div>
                                        <div className="text-xs text-gray-500 font-medium">Peak</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-900">
                                            {(enquiryChartList.reduce((sum, item) => sum + item.count, 0) / enquiryChartList.length).toFixed(1)}
                                        </div>
                                        <div className="text-xs text-gray-500 font-medium">Avg/Day</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {reviewList.slice(-2).map((userReviewDetails, index) => (
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
                                            <span className="text-xs font-medium text-green-700">#{reviewList.length - index}</span>
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
                                        <p className="text-gray-700 leading-relaxed text-lg pl-6 pr-2 italic">
                                            {userReviewDetails.reviewText}
                                        </p>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {enquiryList.slice(-2).map((item, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100"
                        >
                            {/* Animated Gradient Border */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>

                            <div className="relative bg-white rounded-3xl m-0.5 h-full">
                                {/* Header Section */}
                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-blue-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center mr-3 shadow-lg">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-bold text-gray-900">Recent Enquiry</h2>
                                                <p className="text-sm text-gray-600">New student inquiry</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="p-6">
                                    {/* User Info */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mr-4 border border-blue-200">
                                                <span className="text-lg font-bold text-blue-700">
                                                    {item.name?.charAt(0) || "S"}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-500">Prospective Student</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div className="flex items-center p-3 rounded-xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors duration-200">
                                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-600">Email</div>
                                                <div className="text-sm font-medium text-gray-900">{item.email}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center p-3 rounded-xl bg-cyan-50 border border-cyan-100 hover:bg-cyan-100 transition-colors duration-200">
                                            <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center mr-3">
                                                <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-600">Phone</div>
                                                <div className="text-sm font-medium text-gray-900">{item.phone}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subject and Message */}
                                    <div className="space-y-4">
                                        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-4 border border-gray-200">
                                            <div className="flex items-center mb-2">
                                                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <h4 className="font-semibold text-gray-900">Subject</h4>
                                            </div>
                                            <p className="text-gray-700 font-medium">{item.subject}</p>
                                        </div>

                                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                                            <div className="flex items-center mb-2">
                                                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                                    </svg>
                                                </div>
                                                <h4 className="font-semibold text-gray-900">Message</h4>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute -left-2 top-0 text-2xl text-green-200 font-serif">"</div>
                                                <p className="text-gray-700 leading-relaxed pl-4 pr-2 italic">
                                                    {item.message}
                                                </p>
                                                <div className="absolute -right-2 bottom-0 text-2xl text-green-200 font-serif rotate-180">"</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-100">
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {item.createdAt ? (
                                                new Date(item.createdAt).toLocaleString("en-US", {
                                                    weekday: "short",
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })
                                            ) : "Recent"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Dashboard;