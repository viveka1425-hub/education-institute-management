import { useEffect, useState } from "react";

export default function FacilityForm({ initial, onSave }) {
  const [form, setForm] = useState(initial);
  useEffect(() => setForm(initial), [initial]);
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Facility Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="mt-1 w-full p-2 border rounded">
            <option>Academic</option>
            <option>Residential</option>
            <option>Sports</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Availability</label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input type="checkbox" name="available" checked={form.available} onChange={handleChange} />
              <span className="ml-2 text-sm">Available</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm">Capacity</label>
          <input name="capacity" type="number" value={form.capacity} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="mt-1 w-full p-2 border rounded" rows={3} />
        </div>
        <div>
          <label className="block text-sm">Location</label>
          <input name="location" value={form.location} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
        </div>

        <div className="md:col-span-2 flex justify-end mt-4">
          <button className="px-4 py-2 rounded bg-[#614b97] text-white">Save Facility</button>
        </div>
      </div>
    </form>
  );
}