import axios from "axios";
import { API_URL } from "../config/config";

const authorizationToken = () => {
    return {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
}
export async function getUsersData() {
    const result = await axios.get(API_URL + "/pending", { headers: authorizationToken() })
    return result;
}

export async function updateUserStatus(userId, action) {
    const body = {
        action: action
    }
    const result = await axios.put(`http://localhost:7007/status/${userId}`, body);
    return result;
}

export async function getApproveData(searchText, state, feeRange, facilityName, rating) {
    const result = await axios.get(API_URL + `/approving?searchText=${searchText}&state=${state}&feeRange=${feeRange}&facilityName=${facilityName}&rating=${rating}`)
    return result;
}

export async function submitReview(userId, id, review, reviewText, status, date) {
    const ReviewDetails = {
        rating: review,
        reviewText: reviewText,
        status: status,
        date: date
    }
    const res = await axios.post(API_URL + `/review/${userId}/${id}`, ReviewDetails)
    return res;
}

export async function listReview(id, name) {
    const fname = {
        name: name
    }
    const result = await axios.get(API_URL + `/reviewCollection/${id}`, fname)
    return result;
}

export async function reviewListAdmin() {
    const result = await axios.get(API_URL + "/userReviewDetails")
    return result;
}

export async function reviewListInstitute(instituteId) {
    const endpoint = instituteId && instituteId !== 'null' ? `/userReviewDetails?instituteId=${instituteId}` : `/userReviewDetails`
    const result = await axios.get(API_URL + `${endpoint}`)
    return result;
}

export async function rejectedReview(_id) {
    const result = await axios.put(API_URL + `/statusUpdate/${_id}`)
    return result;
}

export async function enquiryList(userId, id, name, email, phone, subject, message, status, date) {
    const enquiry = {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
        status: status,
        date: date
    }
    const res = await axios.post(API_URL + `/enquiry/${id}/${userId}`, enquiry)
    return res;
}

export async function getEnquiryList(id) {
    const res = await axios.get(API_URL + `/getEnquiry?instituteId=${id}`)
    return res;
}

export async function enquiryReplay(_id, response) {
    const replay = {
        response: response
    }
    const result = await axios.put(API_URL + `/instituteEnquiryReplay/${_id}`, replay)
    return result;
}

export async function getEnquiryReplay(id, userId) {
    const res = axios.get(API_URL + `/institutionReplaySendForUser/${id}/${userId}`)
    return res;
}

export async function getCount(id) {
    const result = axios.get(API_URL + `/reviewCount/${id}`)
    return result;
}