import  ProfileForm from "./ProfileForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EditCourse } from "../../services/profileService";

export default function ProfileEdit({ }) {
    const location = useLocation();
    const data = location.state

    //const profile = storedProfile.profile;
    const { id } =useParams();
    const navigate = useNavigate();
    const profile = (data.profile || []).find((p) => Object(p.id) === Object(id)) || null;

    const index = data.profile.findIndex(item => Object(item.id) === Object(id) );

    if(!profile) return <div>profile not found</div>

    async function handleSave(updated) {
        data.profile[index]= updated;
        const obj = {
            profile : data.profile
        }
        await EditCourse(obj);
        navigate("/profile/ProfileView");
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