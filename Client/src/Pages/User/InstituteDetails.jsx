import { useEffect, useRef, useState } from "react";
import { Details } from "../../services/profileService";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { submitReview } from "../../services/adminService";
import { listReview } from "../../services/adminService";
import { API_URL } from '../../config/config';
import { Star } from "lucide-react";
import { Menu as MenuIcon } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

export default function InstituteDetails() {
  const [list, setList] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const [content, setContent] = useState();
  const courseRef = useRef(null);
  const facilityRef = useRef(null);
  const reviewsRef = useRef(null)
  const navigate = useNavigate();

  //const [reviewList, setReviewList] = useState({});
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const visibleReview = showAll ? reviews : reviews.slice(0, 3);


  const { id } = useParams()
  const userId = localStorage.getItem('user_id')
  console.log('userId ' + userId)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !reviewText.trim()) return;
    console.log({
      rating,
      reviewText,
    });
    const date = new Date();
    await instituteReview(userId, id, rating, reviewText, "approved", date)
    setRating(0);
    setReviewText("");
    toast("Review send successfully")
    //alert("review successful")
    reviewListCollection(id, name)
  };


  const handleClick = (value) => {
    setContent(value);
  };

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

  if (content === 'courses') {
    setTimeout(() => {
      if (courseRef.current) {
        courseRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 0);
  }

  if (content === 'facilities') {
    setTimeout(() => {
      if (facilityRef.current) {
        facilityRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 0);
  }
  const Role = localStorage.getItem("role");

  if (content === 'reviews') {
    if (userId) {
      setTimeout(() => {
        if (reviewsRef.current) {
          reviewsRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 0);
    } else {
      navigate('/login');
    }
  }
  const Enquiry = () => {
    if (userId) {
      navigate(`/EnquiryForm/${id}/${userId}`);
    } else {
      navigate("/login");
    }
  };


  useEffect(() => {
    details(id);
    reviewListCollection(id, name)
  }, []);


  return (
    <div>
      <div>
        <div className="flex flex-col sm:flex-row md:items-center  p-6 bg-transparent">
          {/* Logo Left */}
          <div className="ml-15 flex-shrink-0">
            <img
              src={API_URL + `/uploads/${list.logo}`}
              alt="Institute Logo"
              className="w-40 h-40 rounded-full border-green-300 shadow-md object-cover"
            />
          </div>

          {/* Name & Tagline Right */}
          <div className="ml-4">
            <h2 className="text-3xl font-bold text-green-800">{list.name}</h2>
            <p className="text-green-600">{list.tagline}</p>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-200 py-10 px-4 sm:px-8">
        <nav className="bg-green-100 shadow-xl text-green-800" style={{ borderRadius: 30, marginBottom: 4 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">

              {/* Desktop Menu Links */}
              <div className="pl-70 hidden lg:flex items-center space-x-1">

                <a onClick={() => handleClick()} className="cursor-pointer px-4 py-3 text-green-800 font-medium hover:text-blue">Home</a>
                <a onClick={() => handleClick('courses')} className="cursor-pointer px-4 py-3 text-white font-medium hover:text-white transition duration-150">Courses</a>
                <a onClick={() => handleClick('facilities')} className="cursor-pointer px-4 py-3 text-white font-medium hover:text-white transition duration-150">Facilities</a>
                {/* <a className="cursor-pointer px-4 py-3 text-white font-medium hover:text-white transition duration-150">Deactivate</a> */}
                {Role !== "admin" && (
                  <div>
                    <a onClick={() => handleClick('reviews')} className="cursor-pointer px-4 py-3 text-white font-medium hover:text-white transition duration-150">Reviews</a>
                    <a onClick={Enquiry} className="cursor-pointer px-4 py-3 text-white font-medium hover:text-white transition duration-150" > Enquiry</a>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button (Hamburger) */}
              <div className="lg:hidden flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown (Simplified for demonstration) */}
          {isMobileMenuOpen && (
            <div className="lg:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-200">
                <a onClick={() => handleClick()} className="cursor-pointer px-4 py-3 text-green-800 font-medium hover:text-blue">Home</a>
                <a onClick={() => handleClick('courses')} className="cursor-pointer px-4 py-3 text-white font-medium hover:text-white transition duration-150">Courses</a>
                <a onClick={() => handleClick('facilities')} className="cursor-pointer px-4 py-3 text-white font-medium hover:text-white transition duration-150">Facilities</a>
                {/* <a className="cursor-pointer px-4 py-3 text-white font-medium hover:text-white transition duration-150">Deactivate</a> */}
                {Role !== "admin" && (
                  <div>
                    <a onClick={() => handleClick('reviews')} className="cursor-pointer px-4 py-3 text-white font-medium hover:text-white transition duration-150">Reviews</a>
                    <a onClick={Enquiry} className="cursor-pointer px-4 py-3 text-white font-medium hover:text-white transition duration-150" > Enquiry</a>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
        <div className=" bg-white shadow-2xl overflow-hidden border border-green-100">
          {/* Banner */}
          {list.banner && (
            <div className="w-full">
              <img
                src={API_URL + `/uploads/${list.banner}`}
                alt="Institute Banner"
                className="w-full h-86 sm:h-82 object-cover"
              />
            </div>
          )}

          {/* Institute Details */}
          <div className="p-6 space-y-2">
            <h3 className="text-2xl font-semibold text-green-700 border-b border-green-200 pb-2">
              Institute Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mt-4">
              <p><span className="font-semibold text-green-600">Email:</span> {list.email}</p>
              <p><span className="font-semibold text-green-600">Phone:</span> {list.phone}</p>
              <p><span className="font-semibold text-green-600">Website:</span> {list.website}</p>
              <p><span className="font-semibold text-green-600">Address:</span> {list.address}</p>
              <p><span className="font-semibold text-green-600">State:</span> {list.state}</p>
              <p><span className="font-semibold text-green-600">Country:</span> {list.country}</p>
              <p><span className="font-semibold text-green-600">Pincode:</span> {list.pincode}</p>
              <p><span className="font-semibold text-green-600">Year:</span> {list.year}</p>
              <p><span className="font-semibold text-green-600">Accreditation:</span> {list.accreditation}</p>
              <p><span className="font-semibold text-green-600">Head:</span> {list.head}</p>
              <p><span className="font-semibold text-green-600">Contact Person:</span> {list.contactPerson}</p>
            </div>
          </div>

          {/* Course Details */}
          {content === "courses" && (
            <div ref={courseRef}>
              <div>
                {(list.courses ?? []).length > 0 && (
                  <div className="p-6 bg-green-50 border-t border-green-100">
                    <h3 className="text-2xl font-semibold text-green-700 border-b border-green-200 pb-2 mb-4">
                      Course Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {(list.courses ?? []).map((course, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all border border-green-100"
                        >
                          <img
                            src={API_URL + `/uploads/${course.image}`}
                            alt={course.name}
                            className="h-32 w-full object-cover rounded-xl mb-3"
                          />
                          <h4 className="text-lg font-semibold text-green-700">{course.name}</h4>
                          <p className="text-sm text-gray-600">{course.category}</p>
                          <p><span className="font-semibold text-green-600">Duration:</span> {course.duration}</p>
                          <p><span className="font-semibold text-green-600">Mode:</span> {course.mode}</p>
                          <p><span className="font-semibold text-green-600">Fees:</span> ₹{course.fees}</p>
                          <p><span className="font-semibold text-green-600">Intake:</span> {course.intake}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Facilities */}
          {content === "facilities" && (
            <div ref={facilityRef}>
              <div>
                {(list.facility ?? []).length > 0 && (
                  <div className="p-6 bg-green-100 border-t border-green-200">
                    <h3 className="text-2xl font-semibold text-green-800 border-b border-green-300 pb-2 mb-4">
                      Facilities
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {(list.facility ?? []).map((facility, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all border border-green-200"
                        >
                          <img
                            src={API_URL + `/uploads/${facility.photo}`}
                            alt={facility.name}
                            className="h-32 w-full object-cover rounded-xl mb-3"
                          />
                          <h4 className="text-lg font-semibold text-green-700">{facility.name}</h4>
                          <p className="text-sm text-gray-600">{facility.category}</p>
                          <p><span className="font-semibold text-green-600">Description:</span> {facility.description}</p>
                          <p><span className="font-semibold text-green-600">Capacity:</span> {facility.capacity}</p>
                          <p><span className="font-semibold text-green-600">Location:</span> {facility.location}</p>
                          <p><span className="font-semibold text-green-600">Available:</span> {facility.available ? "Yes" : "No"}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>)}
        </div>


        {content === "reviews" && (
          <div ref={reviewsRef}>
            <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl p-6 sm:p-8 mt-10 border border-green-100">
              {/* Title */}
              <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
                Student Reviews
              </h2>

              {/* Review Input Section */}
              <div>
                <h3 className="text-2xl font-semibold text-green-700 mb-4 border-b border-green-200 pb-2">
                  Recent Reviews
                </h3>

                <div>
                  {userId && (
                    <div className="bg-green-50/70 p-5 sm:p-6 rounded-2xl mb-8 border border-green-100 shadow-inner transition-all duration-300 hover:shadow-md">
                      <h3 className="text-lg font-medium text-green-800 mb-3">
                        Share Your Experience
                      </h3>

                      {/* Star Rating */}
                      <div className="flex mb-4 justify-center sm:justify-start gap-1">
                        {[...Array(5)].map((_, index) => {
                          const starValue = index + 1;
                          return (
                            <button
                              key={index}
                              style={{ padding: 4 }}
                              type="button"
                              onClick={() => setRating(starValue)}
                              onMouseEnter={() => setHover(starValue)}
                              onMouseLeave={() => setHover(0)}
                              className="focus:outline-none transform transition-transform hover:scale-110 bg-white"
                            >
                              <Star
                                className={`w-4 h-4 ${starValue <= (hover || rating)
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
                        className="w-full p-3 border border-green-200 rounded-2xl focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700 placeholder-gray-400 shadow-sm"
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
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:scale-[1.02]"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                      >
                        Submit Review
                      </button>
                      <ToastContainer />
                    </div>
                  )}
                </div>
                {reviews.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No reviews yet. Be the first!
                  </p>
                ) : (
                  <div className="space-y-5">
                    {visibleReview.map((rev, index) => (
                      <div
                        key={index}
                        className="p-5 border border-green-100 rounded-2xl bg-gradient-to-br from-green-50 via-white to-green-50 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
                      >
                        {/* Reviewer Name */}
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-green-800 text-lg">
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

                    {/* Show All / Show Less Button */}
                    {reviews.length > 3 && (
                      <div className="text-center mt-4">
                        <button
                          onClick={() => setShowAll(!showAll)}
                          className="text-green-700 underline font-medium hover:text-green-900 transition"
                        >
                          {showAll ? "Show less" : "Show all"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};
