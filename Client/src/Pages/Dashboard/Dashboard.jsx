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

const ImageSlider = () => {
    const [name, setName] = useState("");
    const [count, setCount] = useState([]);
    const [enquiryCount, setEnquiryCount] = useState([]);
    const [reviewList, setReviewList] = useState([]);
    const [enquiryList, setEnquiryList] = useState([]);
    const [reviewChartList, setReviewChartList] = useState([]);
    const [enquiryChartList, setEnquiryChartList] = useState([]);

    //const instituteId = localStorage.getItem('institute_id')
    const id = localStorage.getItem('institute_id')

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
        console.log(use.data)
        setCount(use.data.result)
        setEnquiryCount(use.data.enquiry)
    }
    async function resendReviews() {
        const use = await reviewListInstitute(id)
        console.log(use.data.userReviewDetails)
        setReviewList(use.data.userReviewDetails)
    }
    async function resendEnquiry() {
        const use = await getEnquiryList(id)
        console.log(use.data.data)
        setEnquiryList(use.data.data)
    }

    useEffect(() => {
        showName()
        reviewCount()
        resendReviews()
        resendEnquiry()
        reviewChart()
        enquiryChart()
    }, []);


    return (
        <div>
            <div style={{ marginBottom: 20, marginTop: 10, marginLeft: 15 }}>
                <h4 classname=" font-semibold text-green-700 mb-3">Welcome! {name}</h4>
            </div>
            <div className="card-container">
                <div className="dashboard-card">
                    <div className="card-title"> <strong>Total Review</strong> <span className="icon">⭐</span> </div>
                    <div className="card-title"> {count} </div>
                </div>
                {/* <div className="dashboard-card">
                    <div className="card-title"><strong>Total Student </strong><span className="icon">👩‍🎓</span> </div>
                    <div className="card-title">200</div>
                </div> */}
                <div className="dashboard-card bg-[#f7faf0]">
                    <div className="card-title"><strong>Total Enquiries</strong> <span className="icon">👩‍💻</span> </div>
                    <div className="card-title"> {enquiryCount} </div>
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 flex justify-between bg-white p-4 rounded-2xl mt-6 gap-4">
                <div className="w-full flex flex-col bg-white p-4 rounded-2xl shadow-md">
                    <h3 className="text-lg font-semibold text-green-700 mb-3">
                        Review Count ( Weekely )
                    </h3>
                    <div className="w-full h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={reviewChartList} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="reviews" fill="#16a34a" radius={[10, 10, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="w-full bg-white p-4 rounded-2xl shadow-md">
                    <h3 className="text-lg font-semibold text-green-700 mb-3">
                        Enquiry Count
                    </h3>

                    <div className="w-full h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={enquiryChartList} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#16a34a" radius={[10, 10, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {reviewList.slice(-2).map((userReviewDetails, index) => (
                        <div
                            key={index}
                            className="bg-[#f7faf0] hover:from-green-100 hover:to-green-50 shadow-lg rounded-2xl p-5 border border-green-100 transition-transform transform hover:scale-105 duration-300"
                        >
                            <h2 className="text-lg font-semibold text-green-700 mb-3 mb-5 mt-5">Resend review</h2>
                            {/* Header (Name + Rating) */}
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-semibold text-green-900">
                                    {userReviewDetails.userId?.name || "Anonymous"}
                                </h3>
                                <span className="text-yellow-500 font-semibold">
                                    ⭐ {userReviewDetails.rating}
                                </span>
                            </div>

                            {/* Review Text */}
                            <p className="text-gray-700 leading-relaxed italic mb-4">
                                “{userReviewDetails.reviewText}”
                            </p>

                            {/* Footer (Date) */}
                            <div className="flex justify-end">
                                <p className="text-xs text-gray-500">
                                    {new Date(userReviewDetails.date).toLocaleString("en-US", {
                                        weekday: "short",
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {enquiryList.slice(-2).map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#f7faf0] to-white hover:from-green-100 hover:to-white 
                 rounded-2xl shadow-lg hover:shadow-2xl border border-green-100 
                 transition-transform duration-300 transform hover:-translate-y-1 p-6"
                        >
                            <h2 className="text-lg font-semibold text-green-700 mb-3 mb-5 mt-5">Resend enquiry</h2>
                            {/* Header: Name and Contact */}
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-green-800">
                                    {item.name}
                                </h3>
                                {/* <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                                    Enquiry #{index + 1}
                                </span> */}
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-1 mb-3 text-sm">
                                <p>
                                    <span className="font-medium text-green-700">📧 Email: </span>
                                    <span className="text-gray-800">{item.email}</span>
                                </p>
                                <p>
                                    <span className="font-medium text-green-700">📞 Phone: </span>
                                    <span className="text-gray-800">{item.phone}</span>
                                </p>
                            </div>

                            <div className="border-t border-green-200 my-4"></div>

                            {/* Subject and Message */}
                            <div className="space-y-2">
                                <p>
                                    <span className="font-medium text-green-700">🎓 Subject: </span>
                                    <span className="text-gray-700">{item.subject}</span>
                                </p>
                                <p className="text-gray-700 leading-relaxed italic">
                                    “{item.message}”
                                </p>
                            </div>

                            {/* Footer Date (Optional, if you have createdAt) */}
                            {item.createdAt && (
                                <p className="text-xs text-gray-500 text-right mt-4">
                                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                                        weekday: "short",
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

            </div>



            {/* <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={3000}
            >
                {images.map(imageURL => <div>
                    <img src={imageURL} alt="1" />
                </div>)}


            </Carousel> */}
        </div>
    );
};
export default ImageSlider;