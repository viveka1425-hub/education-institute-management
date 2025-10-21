import { useLocation, useNavigate, useParams } from "react-router-dom";
import FacilityForm from "./FacilitiesForm";
import { EditFacilities } from "../..//services/profileService";

export default function FacilitiesEdit({ }) {
  const location = useLocation();
  const data = location.state
  console.log(data)
  const { id } = useParams();
  const navigate = useNavigate();
  const item = (data.facilities || []).find((f) => String(f.id) === String(id)) || null;

  const index = (data.facilities || []).findIndex(item => String(item.id) == String(id));

  if (!item) return <div>Facility not found</div>;
  async function handleSave(updated) {
    data.facilities[index] = updated;
    const obj = {
      facility: data.facilities
    }
    await EditFacilities(obj);
  
  navigate("/facilities/facilitiesList");
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Edit Facility</h2>
      </div>
      <FacilityForm initial={item} onSave={handleSave} />
    </div>
  );
}
