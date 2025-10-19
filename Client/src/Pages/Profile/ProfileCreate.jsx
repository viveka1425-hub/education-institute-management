import { useNavigate } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import { registerprofile } from "../../services/profileService";

function ProfileCreate({ }) {
    const navigate = useNavigate();
    const empty = {
        id: Date.now().toString(),
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
    };

    async function handleSave(newProfile) {
        console.log(newProfile)
        const { id, ...rest } = newProfile;
        await registerprofile(newProfile)
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
}
export default ProfileCreate;