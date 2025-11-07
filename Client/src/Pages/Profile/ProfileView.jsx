import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";
import { courseList } from "../../services/profileService";
import { useEffect, useState } from "react";
import { API_URL } from "../../config/config";


export default function ProfileView({ }) {
    const [profile, setProfile] = useState(null);

    const navigate = useNavigate();
    const instituteId = localStorage.getItem('institute_id');
    console.log(instituteId)
    async function fetchList() {
        let use = await courseList();
        console.log(use.data.data)
        setProfile(use.data.data)
    }

    useEffect(() => {
        if (instituteId && instituteId !== 'null') {
            fetchList()
        }
    }, []);

    function handleAddProfile() {
        navigate("/Profile/ProfileCreate")
    }

    function handleEditProfile(id) {
        localStorage.setItem('profile_edit', JSON.stringify(profile));
        navigate("/Profile/ProfileEdit/" + id)
    }

    if (profile)
        console.log(profile.logo)
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-green-900 mb-1">Institute Profile</h2>
                        <p className="text-green-500">View and manage your institution details</p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            onClick={() => handleEditProfile(profile._id)}
                            //to={`/profile/edit/${profile.id}`}
                            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#61b844] to-[#61b844] text-white font-medium shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <p className="text-white">
                                Edit Profile
                            </p>
                        </Link>
                        <Link
                            onClick={handleAddProfile}
                            //to={`/Profile/ProfileCreate`}
                            className="px-6 py-2.5 rounded-lg border-2 border-[#61b844] text-[#61b844] font-medium hover:bg-[#61b844] hover:text-white transition-all duration-200"
                        >
                            <p className="hover:text-white">
                                Create New
                            </p>
                        </Link>
                    </div>
                </div>

                {/* Main Card */}
                {profile ? (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

                        <div className="h-40 bg-gradient-to-r from-[#61b844] via-[#61b844] to-[#61b844] relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
                            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>

                        </div>

                        <div className="p-8">

                            <div className="flex flex-col md:flex-row md:gap-8 -mt-28 relative">
                                <div className="flex-shrink-0">
                                    <div className="h-44 w-44 bg-white rounded-2xl shadow-2xl flex items-center justify-center p-3 border-4 border-white">
                                        {profile.logo ? (
                                            <img
                                                src={API_URL +`/uploads/${profile.logo}`}
                                                alt="logo"
                                                className="h-full w-full object-contain rounded-xl"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center text-gray-400">
                                                <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-sm">Logo</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1 pt-8 md:pt-0 mt-0">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-3xl font-bold xsm:text-black-500  md:text-white  mb-2">{profile.name}</h3>
                                            <p className="text-lg text-white font-medium mb-3">{profile.tagline}</p>
                                            <p className="text-gray-600 leading-relaxed max-w-3xl">{profile.description}</p>
                                        </div>
                                    </div>


                                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-2">

                                        <div className="bg-gradient-to-br from-green-50 to-indigo-50 rounded-xl p-5 border border-green-100">
                                            <div className="flex items-center mb-3">
                                                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-[#61b844] to-[#61b844] flex items-center justify-center mr-3">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <h4 className="font-semibold text-gray-900">Contact Information</h4>
                                            </div>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center text-gray-700">
                                                    <svg className="w-4 h-4 mr-2 text-[#61b844]" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                    </svg>
                                                    {profile.email}
                                                </div>
                                                <div className="flex items-center text-gray-700">
                                                    <svg className="w-4 h-4 mr-2 text-[#61b844]" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                    </svg>
                                                    {profile.phone}
                                                </div>
                                            </div>
                                        </div>


                                        <div className="bg-gradient-to-br from-green-50 to-indigo-50 rounded-xl p-5 border border-green-100">
                                            <div className="flex items-center mb-3">
                                                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-[#61b844] to-[#61b844] flex items-center justify-center mr-3">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                <h4 className="font-semibold text-gray-900">Location</h4>
                                            </div>
                                            <div className="text-sm text-gray-700 leading-relaxed">
                                                <div>{profile.address}</div>
                                                <div>{profile.city} - {profile.pincode}</div>
                                                <div>{profile.state}, {profile.country}</div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-gradient-to-br from-[#61b844] to-[#61b844] rounded-lg p-4 shadow-lg hover:shadow-xl transition-all">
                                            <div className="text-xs text-purple-200 mb-1">Established</div>
                                            <div className="text-xl font-bold text-white">{profile.year}</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-[#61b844] to-[#61b844] rounded-lg p-4 shadow-lg hover:shadow-xl transition-all">
                                            <div className="text-xs text-purple-200 mb-1">Accreditation</div>
                                            <div className="text-base font-bold text-white">{profile.accreditation}</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-[#61b844] to-[#61b844] rounded-lg p-4 shadow-lg hover:shadow-xl transition-all">
                                            <div className="text-xs text-purple-200 mb-1">Head of Institute</div>
                                            <div className="text-base font-bold text-white">{profile.head}</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-[#61b844] to-[#61b844] rounded-lg p-4 shadow-lg hover:shadow-xl transition-all">
                                            <div className="text-xs text-purple-200 mb-1">Contact Person</div>
                                            <div className="text-base font-bold text-white">{profile.contactPerson}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Gallery Section */}
                            {profile.gallery && profile.gallery.length > 0 && (
                                <div className="mt-10 pt-8 border-t border-gray-200">
                                    <div className="flex items-center mb-5">
                                        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-[#61b844] to-[#7256b8] flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h4 className="text-xl font-semibold text-gray-900">Gallery</h4>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {profile.gallery.map((g, idx) => (
                                            <div key={idx} className="group relative overflow-hidden rounded-xl aspect-video cursor-pointer">
                                                <img
                                                    src={g}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    alt={`gallery-${idx}`}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>) : null}
            </div>
        </div>
    )
}