import { useEffect, useState } from "react";
import { getEnquiryList } from "../../services/adminService";

export default function Enquiry() {
    const instituteId = localStorage.getItem('institute_id')
    const [details, setDetails] = useState();

    async function enquiryList() {
        const use = await getEnquiryList(instituteId)
        console.log(use.data.data)
        setDetails(use.data.data)
    }

    useEffect(() => {
        enquiryList()
    }, [])


    return (
        <div className="min-h-screen bg-pink-50 py-10 px-6">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-pink-700 text-center mb-10">
                     Customer Enquiries
                </h2>

                {details && details.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {details.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="mb-3">
                                    <h3 className="text-xl font-semibold text-pink-800">
                                        {item.name}
                                    </h3>
                                    <p>
                                        <span className="font-medium text-pink-700">Email: </span>
                                        <span className="text-gray-700">{item.email}</span>
                                    </p>
                                    <p>
                                        <span className="font-medium text-pink-700">Phone: </span>
                                        <span className="text-gray-700">{item.phone}</span>
                                    </p>
                                </div>

                                <div className="border-t border-pink-100 my-3"></div>

                                <div className="space-y-2">
                                    <p>
                                        <span className="font-medium text-pink-700">Subject: </span>
                                        <span className="text-gray-700">{item.subject}</span>
                                    </p>
                                    <p>
                                        <span className="font-medium text-pink-700">Message: </span>
                                        <span className="text-gray-700">{item.message}</span>
                                    </p>
                                </div>

                                <div className="mt-4 text-right">
                                    <button className="bg-pink-600 text-white text-sm px-4 py-2 rounded-full hover:bg-pink-700 transition-all">
                                        Reply
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-pink-500 mt-10 text-lg">
                        No enquiries found 💭
                    </div>
                )}
            </div>
        </div>
    )
}