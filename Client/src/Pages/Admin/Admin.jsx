import './Admin.css';
import { getApproveData } from "../../services/adminService";
import { API_URL } from "../../../src/config/config";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userName } from '../../services/userService';

export default function InstituteList() {
    const Role = localStorage.getItem("role");
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");
    const [state, setState] = useState("");

    const [feeRange, setFeesRange] = useState({});
    const [facilityName, setFacilityName] = useState([]);
    const [rating, setRating] = useState([]);

    const [name, setName] = useState([]);


    async function showName() {
        let use = await userName();
        console.log(use.data.data.name)
        setName(use.data.data.name)
    }

    const navigate = useNavigate();

    async function acceptList() {
        console.log(search)
        let use = await getApproveData(search, state, feeRange, facilityName, rating);
        console.log(use.data.data)
        console.log(facilityName)
        console.log(rating)
        setList(use.data.data)
    }

    async function handleMoreDetails(id) {
        navigate("/InstituteDetails/" + id)
    }

    async function handleSearch() {
        acceptList()
    }

    useEffect(() => {
        acceptList()
        showName()
    }, []);

    useEffect(() => {
        acceptList()
    }, [search])

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {Role !== "admin" && (
                <div>
                    <div><h1>Welcome! {name}</h1></div>
                    <header className="shadow p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-3 bg-white shadow-sm rounded-md">
                            {/* Search Bar Section */}
                            <div className="w-full md:w-auto flex justify-center md:justify-start">
                                <div className="relative w-full sm:w-64">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                        }}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-800 focus:outline-none text-sm"
                                    />
                                    <svg
                                        className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Filter Section */}
                            <div className="w-full flex flex-wrap md:flex-nowrap justify-center md:justify-end gap-2 mt-2 md:mt-0">
                                <select
                                    name="location"
                                    onChange={(e) => setState(e.target.value)}
                                    className="flex-1 sm:flex-none border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-2 focus:ring-green-800"
                                >
                                    <option value="">Location</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kolkatta">Kolkatta</option>
                                </select>

                                <select
                                    name="fees"
                                    onChange={(e) => setFeesRange(e.target.value)}
                                    className="flex-1 sm:flex-none border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-2 focus:ring-green-800"
                                >
                                    <option value="">Fees</option>
                                    <option value="low">Below ₹50,000</option>
                                    <option value="medium">₹50,000–₹1,00,000</option>
                                    <option value="high">Above ₹1,00,000</option>
                                </select>

                                <select
                                    name="facilities"
                                    onChange={(e) => setFacilityName(e.target.value)}
                                    className="flex-1 sm:flex-none border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-2 focus:ring-green-800"
                                >
                                    <option value="facilities">Facilities</option>
                                    <option value="wi-fi">Wi-Fi</option>
                                    <option value="Library">Library</option>
                                    <option value="sports">Sports</option>
                                    <option value="lab">Laboratory</option>
                                </select>

                                <select
                                    name="rating"
                                    onChange={(e) => setRating(e.target.value)}
                                    className="flex-1 sm:flex-none border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-2 focus:ring-green-800"
                                >
                                    <option value="">Rating</option>
                                    <option value="5">5⭐</option>
                                    <option value="4">4⭐</option>
                                    <option value="3">3⭐</option>
                                    <option value="2">2⭐</option>
                                    <option value="1">1⭐</option>
                                </select>

                                <button
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>


                    </header>
                </div>)}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((info, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-md overflow-hidden relative"
                    >
                        <div className="relative">
                            <img
                                src={info.banner}
                                alt="Banner"
                                className="w-full h-40 object-cover"
                            />
                            <div className="absolute -mt-20 left-1/2 transform -translate-x-1/2 translate-y-1/3">
                                <img
                                    src={info.logo}
                                    alt="Logo"
                                    className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                                />
                            </div>

                        </div>
                        <div className="pt-14 pb-6 px-6 text-center">
                            <h3 className="text-lg font-semibold text-gray-800">{info.name}</h3>
                            <p className="text-gray-500 text-sm">{info.state}</p>

                            {/* <div className="mt-4 text-sm text-gray-600 space-y-1">
                                <p><span className="font-medium">Email:</span> {info.email}</p>
                                <p><span className="font-medium">Phone:</span> {info.phone}</p>
                                <p><span className="font-medium">Website:</span> {info.website}</p>
                                <p><span className="font-medium">Address:</span> {info.address}</p>
                                <p><span className="font-medium">Country:</span> {info.country}</p>
                                <p><span className="font-medium">Pin Code:</span> {info.pincode}</p>
                            </div> */}

                            <button onClick={() => handleMoreDetails(info._id)} className="mt-6 bg-green-40 text-white px-6 py-2 rounded-full hover:bg-pink-500 transition">
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