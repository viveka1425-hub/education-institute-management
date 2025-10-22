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
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            {list.length == 0 ? <h3 className="text-xl font-semibold text-gray-900 mb-2">No pending list Yet</h3> :
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
                    {list.map((info, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-[#614b97] to-[#7256b8] text-white rounded-2xl shadow-2xl p-6 transition-all hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(114,86,184,0.5)]"
                        >
                            <h2 className="text-2xl font-semibold text-center mb-5 border-b border-white/30 pb-2">
                                Institute Information
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <User size={18} className="text-white/80" />
                                        <span className="text-sm text-white/80">Name</span>
                                    </div>
                                    <span className="text-lg font-semibold">{info.name}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Mail size={18} className="text-white/80" />
                                        <span className="text-sm text-white/80">Email</span>
                                    </div>
                                    <span className="text-lg font-semibold break-all text-right">{info.email}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Phone size={18} className="text-white/80" />
                                        <span className="text-sm text-white/80">Phone</span>
                                    </div>
                                    <span className="text-lg font-semibold">{info.phone}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Globe size={18} className="text-white/80" />
                                        <span className="text-sm text-white/80">Website</span>
                                    </div>
                                    <span className="text-lg font-semibold truncate max-w-[150px] text-right">{info.website}</span>
                                </div>

                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={18} className="text-white/80" />
                                        <span className="text-sm text-white/80">Address</span>
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
