import { useLocation, useNavigate } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import { addProfile } from "../../services/profileService";

export default function ProfileCreate({ }) {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    console.log(data)
    const existingProfile = data;
    const empty = {
        name: "",
        tagline: "",
        description: "",
        email: "",
        phone: "",
        website: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        year: new Date().getFullYear(),
        accreditation: "",
        head: "",
        contactPerson: "",
        logo: "",
        banner: "",
        gallery: [],
        userId: localStorage.getItem('user_id')
    };

    async function handleSave(newProfile) {
        console.log(newProfile)
        const data = await addProfile(newProfile);
        localStorage.setItem('institute_id', data.data.instituteId)
        navigate("/Profile/ProfileView");
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Create Profile</h2>
            </div>
            <ProfileForm initial={empty} onSave={handleSave} />
        </div>
    );

};