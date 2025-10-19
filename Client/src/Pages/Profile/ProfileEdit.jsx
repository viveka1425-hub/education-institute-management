//import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileForm from "./ProfileForm";


export default function ProfileEdit({ }) {
    const storedProfile = JSON.parse(localStorage.getItem("institute_data_v1")) || null;
    const profile = storedProfile.profile;
    const navigate = useNavigate();

    function handleSave(updated) {
        const next = { ...data, profile: { ...updated } };
        updateData(next);
        navigate("/profile/view");
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Edit Profile</h2>
            </div>
            <ProfileForm initial={profile} onSave={handleSave} />
        </div>
    );
}