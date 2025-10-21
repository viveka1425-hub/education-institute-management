import React, { useEffect, useState } from "react";
import { getUsersData } from "../../services/adminService";

export default function DataList() {

    const [list, setList] = useState([]);
    async function requestsList() {
        let use = await getUsersData();
        console.log(use.data.data)
        console.log(list)
        setList(use.data.data)
    }


    console.log(list)
    useEffect(() => {
        requestsList()
    }, []);


    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <div className="flex gap-4">
                {list.map((info) => (
                    <div>
                        <label>name</label>
                        <p>{info.name}</p>
                        <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">Accept</button>
                        <button className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition">Reject</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
