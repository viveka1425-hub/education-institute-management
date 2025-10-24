import ProfileForm from "./ProfileForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EditCourse } from "../../services/profileService";

export default function ProfileEdit() {

    //const profile = storedProfile.profile;
    const { id } = useParams();
    const navigate = useNavigate();

    const profile = JSON.parse(localStorage.getItem('profile_edit'))



    if (!profile) return <div>profile not found</div>

    async function handleSave(updated) {
        const obj = {
            ...profile,
            ...updated
        }
        await EditCourse(obj);
        navigate("/profile/ProfileView");
    }
    console.log(profile)
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Edit Profile</h2>
            </div>
            <ProfileForm initial={profile} onSave={handleSave} />
        </div>
    );
}