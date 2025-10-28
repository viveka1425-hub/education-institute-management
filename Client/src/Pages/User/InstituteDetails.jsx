import { useEffect, useState } from "react";
import { Details } from "../../services/profileService";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { submitReview } from "../../services/adminService";
import { listReview } from "../../services/adminService";
import { API_URL } from '../../config/config';
import { Star } from "lucide-react";

export default function InstituteDetails() {
  const [list, setList] = useState({});
  const navigate = useNavigate();

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
    //console.log(date);
    await instituteReview(userId, id, rating, reviewText, "approved", date)
    setRating(0);
    setReviewText("");
    alert("review successful")
    reviewListCollection(id, name)
  };

  const handleEnquiry = () => {
    navigate("/EnquiryForm/" + id);
  };

  const { id } = useParams()
  const userId = localStorage.getItem('user_id')
  console.log('userId ' + userId)


  async function details(id) {
    let use = await Details(id)
    console.log(use.data.data)
    setList(use.data.data)
  }

  async function instituteReview(userId, id, review, reviewText, status, date) {
    let use = await submitReview(userId, id, review, reviewText, status, date)
    console.log(use)
  }

  async function reviewListCollection(id, name) {
    const use = await listReview(id, name)
    console.log(use.data.collection)
    setReviews(use.data.collection)
  }

  useEffect(() => {
    console.log('Id is on UseEffect ', id)
    details(id);
    reviewListCollection(id, name)
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
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl p-6 sm:p-8 mt-10 border border-pink-100">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">
          Student Reviews
        </h2>
        <button onClick={handleEnquiry}>Enquiry form</button>

        {/* Review Input Section */}
        {userId && (
          <div className="bg-pink-50/70 p-5 sm:p-6 rounded-2xl mb-8 border border-pink-100 shadow-inner transition-all duration-300 hover:shadow-md">
            <h3 className="text-lg font-medium text-pink-800 mb-3">
              Share Your Experience
            </h3>

            {/* Star Rating */}
            <div className="flex mb-4 justify-center sm:justify-start">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                    className="focus:outline-none transform transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${starValue <= (hover || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                        }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Review Textarea */}
            <textarea
              className="w-full p-3 border border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm"
              rows="4"
              placeholder="Write your honest thoughts about this institute..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!rating || !reviewText.trim()}
              className={`mt-5 w-full py-3 rounded-2xl text-lg font-medium transition-all duration-300 shadow-sm ${rating && reviewText.trim()
                ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:shadow-lg hover:scale-[1.02]"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
            >
              Submit Review
            </button>
          </div>
        )}

        {/* Review Display Section */}
        <div>
          <h3 className="text-2xl font-semibold text-pink-700 mb-4 border-b border-pink-200 pb-2">
            Recent Reviews
          </h3>

          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No reviews yet. Be the first!</p>
          ) : (
            <div className="space-y-5">
              {reviews.map((rev, index) => (
                <div
                  key={index}
                  className="p-5 border border-pink-100 rounded-2xl bg-gradient-to-br from-pink-50 via-white to-pink-50 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  {/* Reviewer Name */}
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-pink-800 text-lg">
                      {rev.userId?.name || "Anonymous"}
                    </h4>
                    <span className="text-sm text-gray-400">
                      {new Date(rev.date).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center mb-2">
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
                  <p className="text-gray-700 leading-relaxed">{rev.reviewText}</p>

                  {/* Time */}
                  <p className="text-sm text-gray-400 mt-2 italic">
                    {new Date(rev.date).toLocaleString("en-US", {
                      weekday: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>


  )
};
