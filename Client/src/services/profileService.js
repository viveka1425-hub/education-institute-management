import axios from 'axios';
async function registerprofile(profileData) {
    const result = await axios.post("http://localhost:7007/profile-submit", profileData)
    return result;
}

async function updateprofile() {
    const res = await axios.get("http://localhost:7007/profile-update")
    return res;
}

async function updatecourses(profileData) {
    const res = await axios.put("http://localhost:7007/profile-update/68f31bbc861c4e131c9f32b4", profileData)
    return res;
}

async function courseList(profileData){
    const result = await axios.get("http://localhost:7007/profile-List/68f31bbc861c4e131c9f32b4" ,profileData)
    return result;
}

async function EditCourse(profileData){
    const result = await axios.put("http://localhost:7007/profile-update/68f31bbc861c4e131c9f32b4", profileData)
    return result;
}

async function updateFacilities(profileData) {
    const res = await axios.put("http://localhost:7007/profile-update/68f31bbc861c4e131c9f32b4", profileData)
    return res;
}

async function facilitiesList(profileData){
    const result = await axios.get("http://localhost:7007/profile-List/68f31bbc861c4e131c9f32b4" ,profileData)
    return result;
}

async function EditFacilities(profileData){
    const result = await axios.put("http://localhost:7007/profile-update/68f31bbc861c4e131c9f32b4", profileData)
    return result;
}

export {
    registerprofile,
    updateprofile,
    updatecourses,
    courseList,
    EditCourse,
    updateFacilities,
    facilitiesList,
    EditFacilities
}