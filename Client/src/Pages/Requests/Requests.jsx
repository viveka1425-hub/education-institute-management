import React, { useEffect, useState } from "react";
import { getUsersData } from "../../services/adminService";
import { updateUserStatus } from "../../services/adminService";
import { Mail, Phone, Globe, MapPin, User } from "lucide-react";
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
            alert(`${action}ed successfully`); // or show a toast
        } catch (error) {
            console.log(error)
            alert("Failed to update user status");
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

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <User size={18} className="text-green/80" />
                                        <span className="text-sm text-green/80">Name</span>
                                    </div>
                                    <span className="text-lg font-semibold">{info.name}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Mail size={18} className="text-green/80" />
                                        <span className="text-sm text-green/80">Email</span>
                                    </div>
                                    <span className="text-lg font-semibold break-all text-right">{info.email}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Phone size={18} className="text-green/80" />
                                        <span className="text-sm text-green/80">Phone</span>
                                    </div>
                                    <span className="text-lg font-semibold">{info.phone}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Globe size={18} className="text-green/80" />
                                        <span className="text-sm text-green/80">Website</span>
                                    </div>
                                    <span className="text-lg font-semibold truncate max-w-[150px] text-right">{info.website}</span>
                                </div>

                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={18} className="text-green/80" />
                                        <span className="text-sm text-green/80">Address</span>
                                    </div>
                                    <span className="text-lg font-semibold text-right max-w-[200px] leading-snug">
                                        {info.address}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4 mt-8">
                                <button onClick={() => handleStatusChange(info.userId._id, "accept")} className="px-6 py-2 rounded-full font-semibold bg-white text-[#614b97] hover:bg-[#f3f3f3] shadow-md transition duration-300"> Accept </button>
                                <button onClick={() => handleStatusChange(info.userId._id, "reject")} className="px-6 py-2 rounded-full font-semibold border border-white text-white hover:bg-white hover:text-[#614b97] shadow-md transition duration-300"> Reject </button>
                            </div>
                        </div>
                    ))}
                </div>}
        </div>
    );
};
