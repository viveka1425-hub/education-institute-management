import axios from 'axios';
import { API_URL } from "../config/config";

async function registerprofile(profileData) {
    const result = await axios.post(API_URL + "/profile-submit", profileData)
    return result;
}

async function addProfile(profileData) {
    const result = await axios.post(API_URL + "/profile-submit", profileData)
    return result;
}

async function updateprofile() {
    const res = await axios.get(API_URL + "/profile-update")
    return res;
}

async function updatecourses(profileData) {
    const instituteId = localStorage.getItem('institute_id');
    const res = await axios.put(API_URL + "/profile-update/" + instituteId, profileData)
    return res;
}

async function courseList(profileData) {
    const instituteId = localStorage.getItem('institute_id');
    const result = await axios.get(API_URL + "/profile-List/" + instituteId, profileData)
    return result;
}

async function EditCourse(profileData) {
    const instituteId = localStorage.getItem('institute_id');
    const result = await axios.put(API_URL + "/profile-update/" + instituteId, profileData)
    return result;
}

async function updateFacilities(profileData) {
    const instituteId = localStorage.getItem('institute_id');
    const res = await axios.put(API_URL + "/profile-update/" + instituteId, profileData)
    return res;
}

async function facilitiesList(profileData) {
    const instituteId = localStorage.getItem('institute_id');
    const result = await axios.get(API_URL + "/profile-List/" + instituteId, profileData)
    return result;
}

async function EditFacilities(profileData) {
    const instituteId = localStorage.getItem('institute_id');
    const result = await axios.put(API_URL + "/profile-update/" + instituteId, profileData)
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
    EditFacilities,
    addProfile
}