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
                        <h2 className="text-3xl font-bold text-green-700 mb-1">Institute Profile</h2>
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
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 group">

                        <div className="h-64 md:h-80 bg-gradient-to-r from-[#9ade6d] via-[#9ade6d] to-[#9ade6d] relative overflow-hidden">
                            {profile.banner ? (
                                <div className="relative w-full h-full mb-10">
                                    <img
                                        src={profile.banner}
                                        alt="Institute Banner"
                                        className="w-full h-full object-cover"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>

                                    <div className="absolute -left-20 -top-20 w-60 h-60 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                                    <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                                </div>
                            ) : (

                                <div className="relative w-full h-full">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#9ade6d] via-[#7ed957] to-[#61b844]"></div>
                                    <div className="absolute -right-20 -top-20 w-60 h-60 bg-white/20 rounded-full"></div>
                                    <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-white/20 rounded-full"></div>
                                </div>
                            )}
                            <div className="absolute bottom-6 left-6 md:left-8 right-6">
                                <h1 className="text-right text-2xl font-semibold text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                                    {profile.name}
                                </h1>
                                <p className="text-right text-2xl font-semibold text-xl md:text-2xl text-white/90 font-medium drop-shadow-lg">
                                    {profile.tagline}
                                </p>
                            </div>
                        </div>
                        <div className="p-6 md:p-8 mt-10">
                            <div className="flex flex-col lg:flex-row gap-8 -mt-20 lg:-mt-32 relative">
                                <div className="flex-shrink-0 flex justify-center lg:justify-start">
                                    <div className="relative">
                                        <div className="h-44 w-44 bg-white rounded-2xl flex items-center justify-center border-4 border-white relative z-10">
                                            {profile.logo ? (
                                                <img
                                                    src={profile.logo}
                                                    alt="Institute Logo"

                                                />
                                            ) : (
                                                <div className="flex flex-col items-center text-gray-400">
                                                    <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="text-sm">Upload Logo</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 pt-8 lg:pt-0 mt-10">
                                    <div className="mb-8">
                                        {profile.description}
                                    </div>
                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 hover:border-green-200 transition-all duration-300 group-hover:shadow-lg">
                                            <div className="flex items-center mb-4">
                                                <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-[#61b844] to-[#4a8c32] flex items-center justify-center mr-4">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-xl font-bold text-gray-900">Contact Information</h4>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center text-gray-700 p-3 rounded-lg bg-white/50 hover:bg-white transition-colors">
                                                    <svg className="w-5 h-5 mr-3 text-[#61b844]" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                    </svg>
                                                    <span className="font-medium">{profile.email}</span>
                                                </div>
                                                <div className="flex items-center text-gray-700 p-3 rounded-lg bg-white/50 hover:bg-white transition-colors">
                                                    <svg className="w-5 h-5 mr-3 text-[#61b844]" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                    </svg>
                                                    <span className="font-medium">{profile.phone}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-br from-green-50 to-cyan-50 rounded-2xl p-6 border border-green-100 hover:border-green-200 transition-all duration-300 group-hover:shadow-lg">
                                            <div className="flex items-center mb-4">
                                                <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-[#55a13b] to-[#55a13b] flex items-center justify-center mr-4">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-xl font-bold text-gray-900">Location</h4>
                                            </div>
                                            <div className="space-y-2 text-gray-700 p-3 rounded-lg bg-white/50">
                                                <div className="font-medium">{profile.address}</div>
                                                <div>{profile.city} - {profile.pincode}</div>
                                                <div>{profile.state}, {profile.country}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                        <div className="bg-gradient-to-br from-[#61b844] to-[#4a8c32] rounded-xl p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                            <div className="text-white/80 text-sm font-medium mb-2">Established</div>
                                            <div className="text-2xl font-bold text-white">{profile.year}</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-[#61b844] to-[#4a8c32] rounded-xl p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                            <div className="text-white/80 text-sm font-medium mb-2">Accreditation</div>
                                            <div className="text-lg font-bold text-white leading-tight">{profile.accreditation}</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-[#61b844] to-[#4a8c32] rounded-xl p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                            <div className="text-white/80 text-sm font-medium mb-2">Head of Institute</div>
                                            <div className="text-lg font-bold text-white leading-tight">{profile.head}</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-[#61b844] to-[#4a8c32] rounded-xl p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                            <div className="text-white/80 text-sm font-medium mb-2">Contact Person</div>
                                            <div className="text-lg font-bold text-white leading-tight">{profile.contactPerson}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {profile.gallery && profile.gallery.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-gray-200">
                                    <div className="flex items-center mb-6">
                                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-[#61b844] to-[#7256b8] flex items-center justify-center mr-4">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h4 className="text-2xl font-bold text-gray-900">Gallery</h4>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {profile.gallery.map((g, idx) => (
                                            <div key={idx} className="group relative overflow-hidden rounded-2xl aspect-video cursor-pointer transform hover:-translate-y-2 transition-all duration-300">
                                                <img
                                                    src={g}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    alt={`Gallery ${idx + 1}`}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                    <span className="text-white font-medium text-sm">View Image {idx + 1}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
                        <div className="text-gray-400 text-lg">No profile data available</div>
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
                )}
            </div>
        </div>
    )
}