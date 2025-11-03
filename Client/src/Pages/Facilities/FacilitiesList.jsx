import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditFacilities, facilitiesList } from "../../services/profileService"
import { API_URL } from '../../config/config';


export default function FacilitiesList({  }) {

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
    navigate("/Facilities/FacilitiesCreate" , { state: { Facilities: items } })
  }
  function handleEditFacilities(id) {
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
            <a
              onClick={handleAddFacility}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-[#61b844] to-[#61b844] text-white font-medium shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <div className="text-white cursor-pointer">Add Facility</div>
            </a>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Card Header with Status Indicator */}
              <div className={`h-2 bg-gradient-to-r ${getCategoryColor(f.category)}`}></div>

              <div className="p-6">
                {/* Icon and Title */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${getCategoryColor(f.category)} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                      {getCategoryIcon(f.category)}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#61b844] transition-colors">
                        {f.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-[#61b844] font-medium text-xs">
                          {f.category}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${f.available
                          ? 'bg-green-100 text-green-700'
                          : 'bg-green-100 text-green-700'
                          }`}>
                          {f.available ? (
                            <>
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Available
                            </>
                          ) : (
                            <>
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                              Unavailable
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {f.description}
                </p>

                {/* Location and Capacity */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 mr-2 text-[#61b844]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{f.location}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-700">
                    <svg className="w-4 h-4 mr-2 text-[#61b844]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Capacity: <strong>{f.capacity}</strong> persons</span>
                  </div>
                </div>
                <div>
                  {f.photo ? (
                    <img src={API_URL + "/uploads/" + f.photo}
                      alt="photo"
                    />
                  ) : (
                    <div></div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <a
                    onClick={() => handleEditFacilities(f.id)}
                    //href={`/Facilities/FacilitiesEdit/${f.id}`}
                    className="text-green flex-1 text-center px-4 py-2.5 rounded-lg border-2 border-[#61b844] text-[#61b844] font-medium hover:bg-[#61b844] hover:text-white transition-all duration-200"
                  >
                    <span className="flex items-center justify-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <div style={{color:"green"}} className="cursor-pointer">Edit</div>
                    </span>
                  </a>
                  <button
                    onClick={() => handleDelete(f.id)}
                    className="bg-[#305921] flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <span className="flex items-center justify-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </span>
                  </button>
                </div>
              </div>
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
            <a
              onClick={handleAddFacility}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-[#61b844] to-[#61b844] text-white font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Add Your First Facility
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
