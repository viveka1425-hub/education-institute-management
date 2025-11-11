import React, { useEffect, useState } from "react";
import { getUsersData } from "../../services/adminService";
import { updateUserStatus } from "../../services/adminService";
import { Mail, Phone, Globe, MapPin, User } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
export default function DataList() {

    const [list, setList] = useState([]);

    async function requestsList() {
        let use = await getUsersData();
        console.log(use.data.data)
        console.log(list)
        setList(use.data.data)
    }
    const handleStatusChange = async (userId, action) => {
        try {
            console.log(userId, action);
            const result = await updateUserStatus(userId, action);
            await requestsList()
            toast(`${action}ed successfully`); // or show a toast
        } catch (error) {
            console.log(error)
            toast("Failed to update user status");
        }
    };

    useEffect(() => {
        requestsList()
    }, []);

    console.log('list', list)

    return (
        <div className="min-h-screen py-10 px-6">
            <h2 className="text-3xl font-bold text-green-700 text-center mb-10">
                Institute List
            </h2>
            {list.length == 0 ? <div className="text-center text-green-500 mt-10 text-lg">
                No pending list yet
            </div> :
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
                    {list.map((info, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-[#d6e8cc] to-[#d6e8cc] text-green-800 rounded-2xl shadow-2xl p-6 transition-all hover:scale-[1.03] hover:shadow-[#d6e8cc]"
                        >
                            <h2 className="text-2xl font-semibold text-center mb-5 border-b border-white/30 pb-2">
                                Institute Information
                            </h2>

                            <div>
                                <div className="space-y-5">
                                    {/* Name */}
                                    <div className="flex items-center justify-between border-b border-[#8ebe6f]/40 pb-3">
                                        <div className="flex items-center gap-2 text-[#217d00]">
                                            <User size={20} className="text-[#8ebe6f]" />
                                            <span className="text-sm font-medium">Name</span>
                                        </div>
                                        <span className="text-lg font-semibold text-gray-800">{info.name}</span>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-center justify-between border-b border-[#8ebe6f]/40 pb-3">
                                        <div className="flex items-center gap-2 text-[#217d00]">
                                            <Mail size={20} className="text-[#8ebe6f]" />
                                            <span className="text-sm font-medium">Email</span>
                                        </div>
                                        <span className="text-lg font-semibold text-gray-800 break-all text-right">
                                            {info.email}
                                        </span>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-center justify-between border-b border-[#8ebe6f]/40 pb-3">
                                        <div className="flex items-center gap-2 text-[#217d00]">
                                            <Phone size={20} className="text-[#8ebe6f]" />
                                            <span className="text-sm font-medium">Phone</span>
                                        </div>
                                        <span className="text-lg font-semibold text-gray-800">{info.phone}</span>
                                    </div>

                                    {/* Website */}
                                    <div className="flex items-center justify-between border-b border-[#8ebe6f]/40 pb-3">
                                        <div className="flex items-center gap-2 text-[#217d00]">
                                            <Globe size={20} className="text-[#8ebe6f]" />
                                            <span className="text-sm font-medium">Website</span>
                                        </div>
                                        <a
                                            href={info.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-lg font-semibold text-[#217d00] hover:text-[#8ebe6f] truncate max-w-[160px] text-right"
                                        >
                                            {info.website}
                                        </a>
                                    </div>

                                    {/* Address */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-2 text-[#217d00]">
                                            <MapPin size={20} className="text-[#8ebe6f]" />
                                            <span className="text-sm font-medium">Address</span>
                                        </div>
                                        <span className="text-lg font-semibold text-gray-800 text-right max-w-[220px] leading-snug">
                                            {info.address}
                                        </span>
                                    </div>
                                </div>

                                {/* Footer Accent */}
                                <div className="mt-6 w-full h-2 bg-gradient-to-r from-[#217d00] to-[#8ebe6f] rounded-full"></div>
                            </div>

                            <div className="flex justify-center gap-4 mt-8">
                                <button onClick={() => handleStatusChange(info.userId._id, "accept")} className="px-6 py-2 rounded-full font-semibold bg-white text-[#614b97] hover:bg-[#f3f3f3] shadow-md transition duration-300"> Accept </button>
                                <ToastContainer />
                                <button onClick={() => handleStatusChange(info.userId._id, "reject")} className="px-6 py-2 rounded-full font-semibold border border-white text-white hover:bg-white hover:text-[#614b97] shadow-md transition duration-300"> Deactivate </button>
                                <ToastContainer />

                            </div>
                        </div>
                    ))}
                </div>}
        </div>
    );
};
