import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditFacilities, facilitiesList } from "../../services/profileService"
import { Link } from "react-router-dom";
import { API_URL } from '../../config/config';


export default function FacilitiesList({ }) {

  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  async function fetchList() {
    let use = await facilitiesList();
    console.log(use.data.data.facility)
    setItems(use.data.data.facility)
  }

  useEffect(() => {
    fetchList()
  }, []);
  //const navigate = useNavigate();

  async function handleDelete(id) {
    const filtegreen = items.filter((f) => f.id !== id);
    console.log('filtegreen', filtegreen);
    const obj = { facility: filtegreen };
    await EditFacilities(obj);
    await fetchList()
  }
  //
  function handleAddFacility() {
    localStorage.setItem("Facilities", JSON.stringify({ Facilities: items }))
    navigate("/Facilities/FacilitiesCreate", { state: { Facilities: items } })
  }
  function handleEditFacilities(id) {
    localStorage.setItem("Facilities", JSON.stringify({ facilities: items }))
    navigate("/Facilities/FacilitiesEdit/" + id, { state: { facilities: items } })
  }
  const getCategoryIcon = (category) => {
    const icons = {
      'Academic': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      'Recreation': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      'Event Space': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      'Amenities': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    };
    return icons[category] || (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    );
  };


  const getCategoryColor = (category) => {
    const colors = {
      'Academic': 'from-green-500 to-green-600',
      'Recreation': 'from-green-500 to-green-600',
      'Event Space': 'from-green-500 to-green-600',
      'Amenities': 'from-orange-500 to-orange-600'
    };
    return colors[category] || 'from-[#61b844] to-[#61b844]';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Facilities</h2>
            <p className="text-gray-500">Manage your institution's facilities and amenities</p>
          </div>
          <div>
            <Link
              onClick={handleAddFacility}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-[#61b844] to-[#61b844] text-white font-medium shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <div className="text-white cursor-pointer">Add Facility</div>
            </Link>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {items.map((f) => (
            <div
              key={f.id}
              className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              {/* Animated Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#61b844] via-[#7256b8] to-[#61b844] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>

              {/* Card Content */}
              <div className="relative bg-white rounded-3xl m-0.5 h-full flex flex-col">
                {/* Large Image Section */}
                <div className="relative h-56 w-full overflow-hidden">
                  {f.photo ? (
                    <img
                      src={f.photo}
                      alt={f.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-black to-gray-100 flex items-center justify-center">
                      <span className="text-black text-6xl">
                        {getCategoryIcon(f.category)}
                      </span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-green/300 backdrop-blur-sm text-white text-sm font-semibold border border-white/30">
                      {getCategoryIcon(f.category)}
                      <span className="ml-1.5">{f.category}</span>
                    </span>
                  </div>

                  {/* Availability Status */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full backdrop-blur-sm text-sm font-medium ${f.available
                      ? 'bg-green-700/70 text-green-100 border border-green-300/30'
                      : 'bg-red-500/20 text-red-100 border border-red-300/30'
                      }`}>
                      {f.available ? (
                        <>
                          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Available
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          Unavailable
                        </>
                      )}
                    </span>
                  </div>

                  {/* Facility Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2 leading-tight drop-shadow-lg">
                      {f.name}
                    </h3>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 text-sm">
                    {f.description}
                  </p>

                  {/* Facility Details */}
                  <div className="space-y-4 mb-6">
                    {/* Location */}
                    <div className="flex items-center p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 group-hover:border-blue-200 transition-colors duration-300">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                        <svg className="w-5 h-5 text-[#61b844]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 font-medium mb-1">Location</div>
                        <div className="text-sm font-semibold text-gray-900">{f.location}</div>
                      </div>
                    </div>

                    {/* Capacity */}
                    <div className="flex items-center p-3 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 group-hover:border-purple-200 transition-colors duration-300">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                        <svg className="w-5 h-5 text-[#7256b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 font-medium mb-1">Capacity</div>
                        <div className="text-sm font-semibold text-gray-900">{f.capacity} persons</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleEditFacilities(f.id)}
                      className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#61b844] to-[#4a8c32] text-white font-semibold hover:from-[#4a8c32] hover:to-[#3a6d27] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white font-semibold hover:from-[#b91c1c] hover:to-[#991b1b] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Hover Effect Corner Accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#61b844] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-3xl"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#7256b8] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#61b844] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#7256b8] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-br-3xl"></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[#61b844] to-[#61b844] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Facilities Yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first facility</p>
            <Link
              onClick={handleAddFacility}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-[#61b844] to-[#61b844] text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Add Your First Facility
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
