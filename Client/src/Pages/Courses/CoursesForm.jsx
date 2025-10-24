import { useEffect, useState } from "react";
import { uploadImage } from "../../services/imageService";

function CourseForm({ initial, onSave }) {
  const [form, setForm] = useState(initial);
  const [image, setImage] = useState(null);

  useEffect(() => setForm(initial), [initial]);

  function handleChange(e) {
    const { name, value,type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked :value }));
  }
  const handleImageChange = async (e, imageKey) => {
    const file = e.target.files[0];
    const imageResponse = await uploadImage(file);

    const imageFile = imageResponse.data.file;
    setForm((s) => ({ ...s, [imageKey]: imageFile }));
    setImage(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Course Name ⭐</label>
          <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Short Code ⭐</label>
          <input name="code" value={form.code} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Category ⭐</label>
          <select name="category" value={form.category} onChange={handleChange} className="mt-1 w-full p-2 border rounded">
            <option>Undergraduate</option>
            <option>Postgraduate</option>
            <option>Diploma</option>
            <option>Certification</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Duration ⭐</label>
          <input name="duration" value={form.duration} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Mode ⭐</label>
          <select name="mode" value={form.mode} onChange={handleChange} className="mt-1 w-full p-2 border rounded">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Online</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Eligibility</label>
          <input name="eligibility" value={form.eligibility} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="mt-1 w-full p-2 border rounded" rows={3} />
        </div>
        <div>
          <label className="block text-sm">Fees ⭐</label>
          <input name="fees" type="number" value={form.fees} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Intake Capacity</label>
          <input name="intake" type="number" value={form.intake} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Course Image</label>
          <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "image")} className="mt-1 w-full p-2 border rounded bg-white" />
        </div>

        <div className="md:col-span-2 flex justify-end mt-4">
          <button className="px-4 py-2 rounded bg-[#614b97] text-white">Save Course</button>
        </div>
      </div>
    </form>
  );
}
export default CourseForm;