import { useState, useEffect } from "react";


function ProfileForm({ initial, onSave }) {
    const [form, setForm] = useState(initial);

    useEffect(() => setForm(initial), [initial]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(form)
        onSave(form);
    }

    // quick file->dataurl helper for demo purposes
    function handleImage(e, field) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setForm((s) => ({ ...s, [field]: reader.result }));
        };
        reader.readAsDataURL(file);
    }

    function handleGalleryAdd(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setForm((s) => ({ ...s, gallery: [...(s.gallery || []), reader.result] }));
        };
        reader.readAsDataURL(file);
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm">Institute Name ⭐</label>
                    <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm">Tagline</label>
                    <input name="tagline" value={form.tagline} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm">Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} className="mt-1 w-full p-2 border rounded" rows={4} />
                </div>
                <div>
                    <label className="block text-sm">Email ⭐</label>
                    <input name="email" value={form.email} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm">Phone ⭐</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm">Website</label>
                    <input name="website" value={form.website} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm">Address ⭐</label>
                     <textarea name="address" value={form.address} onChange={handleChange} className="mt-1 w-full p-2 border rounded"  rows ={2} />
                </div>

                <div>
                    <label className="block text-sm">City ⭐</label>
                     <input name="city" value={form.city} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
                </div>

                <div>
                    <label className="block text-sm">State ⭐</label>
                     <input name="state" value={form.state} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
                </div>

                <div>
                    <label className="block text-sm">Country ⭐</label>
                     <input name="country" value={form.country} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
                </div>

                <div>
                    <label className="block text-sm">Pincode ⭐</label>
                     <input name="pincode" value={form.pincode} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
                </div>

                <div>
                    <label className="block text-sm">Year ⭐ (Establishment)</label>
                    <input name="year" type="number" value={form.year} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm">Accreditation</label>
                    <input name="accreditation" value={form.accreditation} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
                </div>

                <div>
                    <label className="block text-sm">Head of Institute</label>
                    <input name="head" value={form.head} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block text-sm">Contact Person</label>
                    <input name="contactPerson" value={form.contactPerson} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
                </div>

                <div>
                    <label className="block text-sm">Logo (image)</label>
                    <input type="file" accept="image/*" onChange={(e) => handleImage(e, "logo")} className="mt-1" />
                </div>
                <div>
                    <label className="block text-sm">Banner (image)</label>
                    <input type="file" accept="image/*" onChange={(e) => handleImage(e, "banner")} className="mt-1" />
                </div>

                <div>
                    <label className="block text-sm">Add Gallery Image</label>
                    <input type="file" accept="image/*" onChange={handleGalleryAdd} className="mt-1" />
                </div>

                <div className="md:col-span-2 flex items-center justify-end space-x-2 mt-4">
                    <button type="submit" className="px-4 py-2 rounded bg-[#614b97] text-white">Save</button>
                </div>
            </div>
        </form>
    );
}
export default ProfileForm;