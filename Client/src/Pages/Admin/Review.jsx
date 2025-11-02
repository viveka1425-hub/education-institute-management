import { useEffect, useState } from "react";
import { reviewListInstitute } from "../../services/adminService";
import { rejectedReview } from "../../services/adminService";

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
        alert("rejected successfully")
        await adminConclusion()
    }
    useEffect(() => {
        adminConclusion()
    }, [])

    return (
        <div>

            {(reviews ?? []).length > 0 ? (
                <div className="space-y-4">

                    {reviews.map((userReviewDetails, index) => (
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
                            <button onClick={() => handleReject(userReviewDetails._id)} className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-200" > flag </button>
                        </div>
                    ))}

                </div>

            ) : (
                <div className="text-center text-green-500 mt-10 mb-70 text-lg">
                    No reviews found ⭐
                </div>
            )}
        </div>
    )
}