import { useLocation, useNavigate } from "react-router-dom";
import FacilityForm from "./FacilitiesForm";
import { updateFacilities } from "../../services/profileService"

export default function FacilitiesCreate({ }) {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const existingFacilities = data.Facilities;

  console.log('data', existingFacilities)
  const empty = {
    id: Date.now().toString(),
    name: "",
    category: "Academic",
    description: "",
    photo: "",
    available: true,
    capacity: 0,
    location: "",
  };
  async function handleSave(newItem) {
    console.log(newItem)
    existingFacilities.push(newItem)
    const obj = {
      facility: existingFacilities
    }
    console.log(obj);
    await updateFacilities(obj);
    navigate("/Facilities/FacilitiesList");
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Add Facility</h2>
      </div>
      <FacilityForm initial={empty} onSave={handleSave} />
    </div>
  );
}
