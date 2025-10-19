import { useLocation, useNavigate, useParams } from "react-router-dom";
import CourseForm from "./CoursesForm";
import { EditCourse }from "../../services/profileService"

export default function CoursesEdit({ }) {
  const location = useLocation();
  const data = location.state
  
  console.log(data.courses)

  const { id } = useParams();
  const navigate = useNavigate();
  const course = (data.courses || []).find((c) => String(c.id) === String(id)) || null;

  const index = data.courses.findIndex(item => String(item.id) === String(id));
  console.log(index);

  if (!course) return <div>Course not found</div>;

  async function handleSave(updated) {
    data.courses[index] = updated;
    console.log(data.courses);
    const obj = {
      courses: data.courses
    }
    await EditCourse(obj);
    navigate("/Courses/CoursesList")

    // const updatedList = (data.courses || []).map((c) => (c.id === updated.id ? updated : c));
    // const next = { courses: updatedList };
    //navigate("/courses/view");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Edit Course</h2>
      </div>
      <CourseForm initial={course} onSave={handleSave} />
    </div>
  );
}