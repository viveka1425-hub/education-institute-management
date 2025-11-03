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
//import { userName } from "../../services/adminService";

const ImageSlider = () => {
    const [name, setName] = useState("");
    const [count, setCount] = useState([]);
    const [enquiryCount, setEnquiryCount] = useState([]);
    const [reviewList, setReviewList] = useState([]);
    const [enquiryList, setEnquiryList] = useState([]);

    async function showName() {
        let use = await userName();
        console.log(use.data.data.name)
        setName(use.data.data.name)
    }
    const id = localStorage.getItem('institute_id')
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
    }, []);
    // const images = [
    //     "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=60",
    //     "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1200&q=60",
    //     "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=60",
    // ];

    return (
        <div>
            <div style={{ marginBottom: 20, marginTop: 10, marginLeft: 15 }}>
                <h1>Welcome! {name}</h1>
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
                <div className="dashboard-card">
                    <div className="card-title"><strong>Total Enquiries</strong> <span className="icon">👩‍💻</span> </div>
                    <div className="card-title"> {enquiryCount} </div>
                </div>

            </div>
            {reviewList.slice(-2).map((userReviewDetails, index) => (
                <div
                    key={index}
                    className="bg-[#f0fcf4] shadow-md rounded-lg p-4 border border-gray-50"
                >
                    <h3 className="text-lg font-semibold text-gray-800">
                        Name:{userReviewDetails.userId?.name || "Anonymous"}
                    </h3>
                    <h3 className="text-lg font-semibold text-gray-800">
                        Institute name:{userReviewDetails.instituteId?.name || "Anonymous"}
                    </h3>
                    <p className="text-yellow-500 font-medium mt-1">
                        Rating: {userReviewDetails.rating} ⭐
                    </p>

                    {/* Review Text */}
                    <p className="text-gray-700 mt-2">{userReviewDetails.reviewText}</p>

                    {/* Date */}
                    <p className="text-sm text-gray-400 mt-2">
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
            ))}
            <div>
                {enquiryList.slice(-2).map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="mb-3">
                            <h3 className="text-xl font-semibold text-green-800">
                                {item.name}
                            </h3>
                            <p>
                                <span className="font-medium text-green-700">Email: </span>
                                <span className="text-gray-700">{item.email}</span>
                            </p>
                            <p>
                                <span className="font-medium text-green-700">Phone: </span>
                                <span className="text-gray-700">{item.phone}</span>
                            </p>
                        </div>

                        <div className="border-t border-green-100 my-3"></div>

                        <div className="space-y-2">
                            <p>
                                <span className="font-medium text-green-700">Subject: </span>
                                <span className="text-gray-700">{item.subject}</span>
                            </p>
                            <p>
                                <span className="font-medium text-green-700">Message: </span>
                                <span className="text-gray-700">{item.message}</span>
                            </p>
                        </div>
                    </div>
                ))}
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