import { useState } from "react";
import { enquiryReplay } from "../../services/adminService";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export default function ReplayEnquiry() {

    const [response, setResponse] = useState({});
    const { id } = useParams();
    console.log(id)

    async function instituteReplay() {
        const use = await enquiryReplay(id, response)
        console.log(use.data)
        setResponse(use.data)
        toast("successfully")
        //alert("successfully")

    }


    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md border border-pink-200">
            <label className="block text-sm font-medium text-pink-700 mb-2">
                Institute Response
            </label>
            <textarea
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Write your reply here..."
                rows={4}
                className="w-full p-3 border border-pink-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:outline-none resize-none"
            ></textarea>
            <button
                onClick={instituteReplay}
                className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition"
            >
                Send
            </button>
            <ToastContainer />
        </div>
    )
}