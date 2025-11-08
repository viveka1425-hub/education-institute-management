import { useLocation, useNavigate } from "react-router-dom";
import CourseForm from "./CoursesForm";
import { updatecourses } from "../../services/profileService"

export default function CoursesCreate({ }) {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const existingCourses = JSON.parse( localStorage.getItem("courses")).courses

  console.log('data', existingCourses);
  const empty = {
    id: Date.now().toString(),
    name: "",
    code: "",
    category: "Undergraduate",
    duration: "",
    mode: "Full-time",
    eligibility: "",
    description: "",
    fees: 0,
    intake: 0,
    image: "",
    startDate: "",
    endDate: "",
  };
  async function handleSave(newCourse) {
    console.log(newCourse)

    existingCourses.push(newCourse)
    const obj = {
      courses: existingCourses
    }
    console.log(obj);
    await updatecourses(obj);
    navigate("/Courses/CoursesList");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Create Course</h2>
      </div>
      <CourseForm initial={empty} onSave={handleSave} />
    </div>
  );
}