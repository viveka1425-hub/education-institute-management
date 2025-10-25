import { useEffect, useState } from "react";
import { Details } from "../../services/profileService";
import { useParams } from "react-router-dom";
import { submitReview } from "../../services/adminService";
import { listReview } from "../../services/adminService";
import { API_URL } from '../../config/config';
import { Star } from "lucide-react";

export default function InstituteDetails() {
    const [list, setList] = useState({});
    //const [reviewList, setReviewList] = useState({});
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [reviews, setReviews] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!rating || !reviewText.trim()) return;
        console.log({
            rating,
            reviewText,
        });
        const date = new Date();
        console.log(date);
        await instituteReview(userId, id, rating, reviewText, "approved", date)
        setRating(0);
        setReviewText("");
        alert("review successful")
    };

    const { id } = useParams()
    const userId = localStorage.getItem('user_id')
    console.log(userId)


    async function details(id) {
        let use = await Details(id)
        console.log(use.data.data)
        setList(use.data.data)
    }

    async function instituteReview(userId, id, review, reviewText, status, date) {
        let use = await submitReview(userId, id, review, reviewText, status, date)
        console.log(use)
    }

    async function reviewListCollection(id) {
        const use = await listReview(id)
        console.log(use.data.collection)
        setReviews(use.data.collection)
    }

    useEffect(() => {
        console.log('Id is on UseEffect ', id)
        details(id);
        reviewListCollection(id)
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 py-10 px-4 sm:px-8">
            <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-pink-100">
                {/* Header Section: Logo + Institute Name */}
                <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-pink-100">
                    <div className="text-center sm:text-left mb-4 sm:mb-0">
                        <h2 className="text-3xl font-bold text-pink-800">{list.name}</h2>
                        <p className="text-pink-600">{list.tagline || "Educational Excellence"}</p>
                    </div>
                    <div className="flex-shrink-0">
                        <img
                            src={API_URL + `/uploads/${list.logo}`}
                            alt="Institute Logo"
                            className="w-24 h-24 rounded-full border-4 border-pink-300 shadow-md object-cover"
                        />
                    </div>
                </div>

                {/* Banner */}
                {list.banner && (
                    <div className="w-full">
                        <img
                            src={API_URL + `/uploads/${list.banner}`}
                            alt="Institute Banner"
                            className="w-full h-56 sm:h-72 object-cover"
                        />
                    </div>
                )}

                {/* Institute Details */}
                <div className="p-6 space-y-2">
                    <h3 className="text-2xl font-semibold text-pink-700 border-b border-pink-200 pb-2">
                        Institute Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mt-4">
                        <p><span className="font-semibold text-pink-600">Email:</span> {list.email}</p>
                        <p><span className="font-semibold text-pink-600">Phone:</span> {list.phone}</p>
                        <p><span className="font-semibold text-pink-600">Website:</span> {list.website}</p>
                        <p><span className="font-semibold text-pink-600">Address:</span> {list.address}</p>
                        <p><span className="font-semibold text-pink-600">State:</span> {list.state}</p>
                        <p><span className="font-semibold text-pink-600">Country:</span> {list.country}</p>
                        <p><span className="font-semibold text-pink-600">Pincode:</span> {list.pincode}</p>
                        <p><span className="font-semibold text-pink-600">Year:</span> {list.year}</p>
                        <p><span className="font-semibold text-pink-600">Accreditation:</span> {list.accreditation}</p>
                        <p><span className="font-semibold text-pink-600">Head:</span> {list.head}</p>
                        <p><span className="font-semibold text-pink-600">Contact Person:</span> {list.contactPerson}</p>
                    </div>
                </div>

                {/* Course Details */}
                {(list.courses ?? []).length > 0 && (
                    <div className="p-6 bg-pink-50 border-t border-pink-100">
                        <h3 className="text-2xl font-semibold text-pink-700 border-b border-pink-200 pb-2 mb-4">
                            Course Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(list.courses ?? []).map((course, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all border border-pink-100"
                                >
                                    <img
                                        src={API_URL + `/uploads/${course.image}`}
                                        alt={course.name}
                                        className="h-32 w-full object-cover rounded-xl mb-3"
                                    />
                                    <h4 className="text-lg font-semibold text-pink-700">{course.name}</h4>
                                    <p className="text-sm text-gray-600">{course.category}</p>
                                    <p><span className="font-semibold text-pink-600">Duration:</span> {course.duration}</p>
                                    <p><span className="font-semibold text-pink-600">Mode:</span> {course.mode}</p>
                                    <p><span className="font-semibold text-pink-600">Fees:</span> ₹{course.fees}</p>
                                    <p><span className="font-semibold text-pink-600">Intake:</span> {course.intake}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Facilities */}
                {(list.facility ?? []).length > 0 && (
                    <div className="p-6 bg-pink-100 border-t border-pink-200">
                        <h3 className="text-2xl font-semibold text-pink-800 border-b border-pink-300 pb-2 mb-4">
                            Facilities
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {(list.facility ?? []).map((facility, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all border border-pink-200"
                                >
                                    <img
                                        src={API_URL + `/uploads/${facility.photo}`}
                                        alt={facility.name}
                                        className="h-32 w-full object-cover rounded-xl mb-3"
                                    />
                                    <h4 className="text-lg font-semibold text-pink-700">{facility.name}</h4>
                                    <p className="text-sm text-gray-600">{facility.category}</p>
                                    <p><span className="font-semibold text-pink-600">Description:</span> {facility.description}</p>
                                    <p><span className="font-semibold text-pink-600">Capacity:</span> {facility.capacity}</p>
                                    <p><span className="font-semibold text-pink-600">Location:</span> {facility.location}</p>
                                    <p><span className="font-semibold text-pink-600">Available:</span> {facility.available ? "Yes" : "No"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10 border border-gray-100">
                {/* Title */}
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                    Reviews
                </h2>

                {/* Review Input Section */}
                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                        Write a Review
                    </h3>

                    {/* Star Rating */}
                    <div className="flex mb-3">
                        {[...Array(5)].map((_, index) => {
                            const starValue = index + 1;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setRating(starValue)}
                                    onMouseEnter={() => setHover(starValue)}
                                    onMouseLeave={() => setHover(0)}
                                    className="focus:outline-none"
                                >
                                    <Star
                                        className={`w-8 h-8 transition-transform duration-200 ${starValue <= (hover || rating)
                                            ? "fill-yellow-400 text-yellow-400 scale-110"
                                            : "text-gray-300"
                                            }`}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    {/* Review Textarea */}
                    <textarea
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-700"
                        rows="4"
                        placeholder="Write your review here..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={!rating || !reviewText.trim()}
                        className={`mt-4 w-full py-2 rounded-xl font-medium transition-all duration-300 ${rating && reviewText.trim()
                            ? "bg-indigo-600 text-white hover:bg-indigo-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        Submit Review
                    </button>
                </div>

                {/* Review Display Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Recent Reviews
                    </h3>

                    {reviews.length === 0 ? (
                        <p className="text-gray-500 text-center">No reviews yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((rev) => (
                                <div
                                    key={rev.id}
                
                                    className="p-4 border rounded-xl bg-gray-50 shadow-sm"
                                >
                                    <p>{userId.name}</p>
                                    {/* Stars */}
                                    <div className="flex items-center mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < rev.rating
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    {/* Review Text */}
                                    <p className="text-gray-700">{rev.reviewText}</p>
                                    <p className="text-sm text-gray-400 mt-1">{rev.date}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>


    )
};
