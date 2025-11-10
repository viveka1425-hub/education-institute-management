import { useEffect, useRef, useState } from "react";
import { Details } from "../../services/profileService";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { submitReview } from "../../services/adminService";
import { listReview } from "../../services/adminService";
import { API_URL } from '../../config/config';
import { Star } from "lucide-react";
import { Menu as MenuIcon } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { updateUserStatus } from "../../services/adminService";


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

  const handleDeactivate = async (userId, action) => {
    const use = await updateUserStatus(userId, action);
    console.log(use)
  }

  useEffect(() => {
    details(id);
    reviewListCollection(id, name)
  }, []);


  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-white-600 py-8 px-4 sm:px-8 shadow-2xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Logo and Basic Info */}
              <div className="flex items-center gap-6 flex-1">
                <div className="relative">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-4 border-white/20 shadow-2xl overflow-hidden bg-white">
                    <img
                      src={list.logo}
                      alt="Institute Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-emerald-600 rounded-2xl opacity-20 blur-lg -z-10"></div>
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green mb-3 drop-shadow-lg">
                    {list.name}
                  </h1>
                  <p className="text-lg sm:text-xl text-green/90 font-medium drop-shadow-lg max-w-2xl">
                    {list.tagline}
                  </p>
                </div>
              </div>

              {/* Quick Contact Info */}
              <div className="bg-green/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="space-y-3">
                  <div className="flex items-center text-green/90">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">{list.email}</span>
                  </div>
                  <div className="flex items-center text-green/90">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="font-medium">{list.phone}</span>
                  </div>
                  {list.website && (
                    <div className="flex items-center text-green/90">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                      </svg>
                      <span className="font-medium">{list.website}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-2xl border-b border-green-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center h-16">
              {/* Desktop Menu Links */}
              <div className=" hidden lg:flex items-center space-x-1">
                <Link
                  onClick={() => handleClick()}
                  className="cursor-pointer px-6 py-4 text-green-700 font-semibold hover:text-green-900 hover:bg-green-50 rounded-xl transition-all duration-200 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </Link>
                <Link
                  onClick={() => handleClick('courses')}
                  className="cursor-pointer px-6 py-4 text-green-700 font-semibold hover:text-green-900 hover:bg-green-50 rounded-xl transition-all duration-200 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Courses
                </Link>
                <Link
                  onClick={() => handleClick('facilities')}
                  className="cursor-pointer px-6 py-4 text-green-700 font-semibold hover:text-green-900 hover:bg-green-50 rounded-xl transition-all duration-200 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Facilities
                </Link>
                {Role !== "admin" && (
                  <>
                    <Link
                      onClick={() => handleClick('reviews')}
                      className="cursor-pointer px-6 py-4 text-green-700 font-semibold hover:text-green-900 hover:bg-green-50 rounded-xl transition-all duration-200 flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Reviews
                    </Link>
                    <Link
                      onClick={Enquiry}
                      className="cursor-pointer px-6 py-4 bg-gradient-to-r text-white font-semibold  transition-all duration-200 flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Enquiry
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-left">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-3 rounded-xl text-green-700 hover:text-green-900 hover:bg-green-50 transition-all duration-200"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="lg:hidden bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-200 mt-2 mb-4">
                <div className="px-4 pt-2 pb-4 space-y-2">
                  <Link
                    onClick={() => handleClick()}
                    className="cursor-pointer flex items-center px-4 py-3 text-green-700 font-semibold hover:bg-green-50 rounded-xl transition-all duration-200"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Home
                  </Link>
                  <Link
                    onClick={() => handleClick('courses')}
                    className="cursor-pointer flex items-center px-4 py-3 text-green-700 font-semibold hover:bg-green-50 rounded-xl transition-all duration-200"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Courses
                  </Link>
                  <Link
                    onClick={() => handleClick('facilities')}
                    className="cursor-pointer flex items-center px-4 py-3 text-green-700 font-semibold hover:bg-green-50 rounded-xl transition-all duration-200"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Facilities
                  </Link>
                  {Role !== "admin" && (
                    <>
                      <Link
                        onClick={() => handleClick('reviews')}
                        className="cursor-pointer flex items-center px-4 py-3 text-green-700 font-semibold hover:bg-green-50 rounded-xl transition-all duration-200"
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        Reviews
                      </Link>
                      <Link
                        onClick={Enquiry}
                        className="cursor-pointer flex items-center px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:from-green-700 hover:to-emerald-700 rounded-xl transition-all duration-200 justify-center mt-2"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        Enquiry
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Banner */}
          {list.banner && (
            <div className="rounded-3xl shadow-2xl overflow-hidden mb-8 border border-green-200">
              <img
                src={list.banner}
                alt="Institute Banner"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
            </div>
          )}

          {/* Institute Details */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8fbf6f] to-[#8fbf6f] px-6 py-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Institute Information
              </h3>
            </div>

            {/* Details Grid */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Contact Information */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:border-green-300 transition-all duration-300">
                  <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <span className="font-semibold text-green-600 w-20">Email:</span>
                      <span className="ml-2">{list.email}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="font-semibold text-green-600 w-20">Phone:</span>
                      <span className="ml-2">{list.phone}</span>
                    </div>
                    {list.website && (
                      <div className="flex items-center text-gray-700">
                        <span className="font-semibold text-green-600 w-20">Website:</span>
                        <span className="ml-2">{list.website}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location Information */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200 hover:border-blue-300 transition-all duration-300">
                  <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Location
                  </h4>
                  <div className="space-y-2 text-gray-700">
                    <div>{list.address}</div>
                    <div className="flex items-center">
                      <span className="font-semibold text-green-600 w-16">City:</span>
                      <span className="ml-2">{list.city}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold text-green-600 w-16">State:</span>
                      <span className="ml-2">{list.state}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold text-green-600 w-16">Country:</span>
                      <span className="ml-2">{list.country}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold text-green-600 w-16">Pincode:</span>
                      <span className="ml-2">{list.pincode}</span>
                    </div>
                  </div>
                </div>

                {/* Institute Details */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200 hover:border-purple-300 transition-all duration-300">
                  <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Institute Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <span className="font-semibold text-green-600 w-32">Established:</span>
                      <span className="ml-2">{list.year}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="font-semibold text-green-600 w-32">Accreditation:</span>
                      <span className="ml-2">{list.accreditation}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="font-semibold text-green-600 w-32">Head of Institute:</span>
                      <span className="ml-2">{list.head}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="font-semibold text-green-600 w-32">Contact Person:</span>
                      <span className="ml-2">{list.contactPerson}</span>
                    </div>
                  </div>
                </div>
              </div>
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
                        src={course.image}
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
                        src={facility.photo}
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


        {
    content === "reviews" && (
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
    )
  }
      </div >
    </div >
  )
};
