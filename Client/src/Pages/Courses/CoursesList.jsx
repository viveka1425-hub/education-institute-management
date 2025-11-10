import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { courseList, EditFacilities } from "../../services/profileService";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../../config/config';

function CoursesList({ }) {

  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  async function fetchList() {
    let use = await courseList();
    console.log(use.data.data.courses)
    setCourses(use.data.data.courses)
  }

  useEffect(() => {
    fetchList()
  }, []);
  console.log(courses)
  //const navigate = useNavigate();

  async function handleDelete(id) {
    const filtered = courses.filter((c) => c.id !== id);
    const next = { courses: filtered };
    await EditFacilities(next);
    await fetchList();
  }
  function handleAddCourse() {
    localStorage.setItem("courses", JSON.stringify({ courses: courses }))
    navigate("/Courses/CoursesCreate", { state: JSON.stringify({ courses: courses }) })
  }

  function handleEditCourses(id) {
    navigate("/Courses/CoursesEdit/" + id, { state: { courses: courses } })
  }

  const getCategoryIcon = (category) => {
    const icons = {
      'Engineering': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      'Management': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      'Arts & Humanities': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      'Marketing': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      )
    };
    return icons[category] || (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Courses</h2>
            <p className="text-gray-500">Manage your institution's courses and programs</p>
          </div>
          <div>
            <Link
              onClick={handleAddCourse}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-[#61b844] to-[#61b844] text-white font-medium shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <div className="text-white cursor-pointer">Create Course</div>
            </Link>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {courses.map((c) => (
            <div
              key={c.id}
              className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              {/* Animated Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#61b844] via-[#7256b8] to-[#61b844] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>

              {/* Card Content */}
              <div className="relative bg-white rounded-3xl m-0.5 h-full flex flex-col">
                {/* Large Image Section */}
                <div className="relative h-56 w-full overflow-hidden">
                  {c.image ? (
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#61b844] to-[#4a8c32] flex items-center justify-center">
                      <span className="text-white text-6xl">
                        {getCategoryIcon(c.category)}
                      </span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm text-black text-sm font-semibold border border-white/30">
                      {getCategoryIcon(c.category)}
                      <span className="ml-1.5">{c.category}</span>
                    </span>
                  </div>

                  {/* Duration */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm text-white text-sm font-medium">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {c.duration}
                    </span>
                  </div>

                  {/* Course Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2 leading-tight drop-shadow-lg">
                      {c.name}
                    </h3>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 text-sm">
                    {c.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Available Seats */}
                    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 group-hover:border-green-200 transition-colors duration-300">
                      <div className="flex items-center text-gray-600 text-xs font-medium mb-2">
                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-2 group-hover:bg-green-200 transition-colors">
                          <svg className="w-4 h-4 text-[#61b844]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        Available Seats
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{c.intake}</div>
                    </div>

                    {/* Annual Fees */}
                    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 group-hover:border-purple-200 transition-colors duration-300">
                      <div className="flex items-center text-gray-600 text-xs font-medium mb-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-2 group-hover:bg-purple-200 transition-colors">
                          <svg className="w-4 h-4 text-[#7256b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        Annual Fees
                      </div>
                      <div className="text-2xl font-bold text-gray-900">₹{c.fees.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleEditCourses(c.id)}
                      className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#61b844] to-[#4a8c32] text-white font-semibold hover:from-[#4a8c32] hover:to-[#3a6d27] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white font-semibold hover:from-[#b91c1c] hover:to-[#991b1b] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Hover Effect Corner Accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#61b844] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-3xl"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#7256b8] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#61b844] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#7256b8] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-br-3xl"></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {courses.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[#61b844] to-[#61b844] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first course</p>
            <Link
              onClick={handleAddCourse}
              className="text-white cursor-pointer inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-[#61b844] to-[#61b844] font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Create Your First Course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursesList;