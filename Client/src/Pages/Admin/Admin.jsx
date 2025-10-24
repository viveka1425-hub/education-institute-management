import './Admin.css';
import { getApproveData } from "../../services/adminService";
import { API_URL } from "../../../src/config/config";
import { useEffect, useState } from 'react';
import { courseList } from "../../services/profileService";

export default function InstituteList() {
    const [list, setList] = useState([]);

    async function acceptList() {
        let use = await getApproveData();
        console.log(use.data.data)
        setList(use.data.data)
    }

    async function handleMoreDetails() {
        const use = await courseList()
        console.log(use.data.data)
    }

    useEffect(() => {
        acceptList()
    }, []);


    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold text-center mb-8">Institute Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((info, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-md overflow-hidden relative"
                    >
                        {/* Banner */}
                        <div className="relative">
                            <img
                                src={API_URL + "/uploads/" + info.banner}
                                alt="Banner"
                                className="w-full h-40 object-cover"
                            />

                            {/* Logo overlapping banner */}
                            <div className="absolute -mt-20 left-1/2 transform -translate-x-1/2 translate-y-1/3">
                                <img
                                    src={API_URL + "/uploads/" + info.logo}
                                    alt="Logo"
                                    className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                                />
                            </div>

                        </div>

                        {/* Details Section */}
                        <div className="pt-14 pb-6 px-6 text-center">
                            <h3 className="text-lg font-semibold text-gray-800">{info.name}</h3>
                            <p className="text-gray-500 text-sm">{info.state}</p>

                            <div className="mt-4 text-sm text-gray-600 space-y-1">
                                <p><span className="font-medium">Email:</span> {info.email}</p>
                                <p><span className="font-medium">Phone:</span> {info.phone}</p>
                                <p><span className="font-medium">Website:</span> {info.website}</p>
                                <p><span className="font-medium">Address:</span> {info.address}</p>
                                <p><span className="font-medium">Country:</span> {info.country}</p>
                                <p><span className="font-medium">Pin Code:</span> {info.pincode}</p>
                            </div>

                            <button onClick={handleMoreDetails} className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition">
                                Show More Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

// src={API_URL + "/uploads/" + info.banner}
//src={API_URL +"/uploads/" + info.logo}