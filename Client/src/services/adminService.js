import axios from "axios";
import { API_URL } from "../config/config";


export async function getUsersData() {
    const result = await axios.get(API_URL + "/pending")
    return result;
}

export async function updateUserStatus(userId, action) {
    const body = {
        action: action
    }
    const result = await axios.put(`http://localhost:7007/status/${userId}`, body);
    return result;
}

export async function getApproveData(){
    const result =await axios.get(API_URL +"/approving")
    return result;
}

export async function submitReview(userId,id,review,reviewText,status,date){
    const ReviewDetails = {
        rating:review,
        reviewText:reviewText,
        status:status,
        date:date
    }
    const res = await axios.post(API_URL +`/review/${userId}/${id}`,ReviewDetails)
    return res;
}

export async function listReview(id){
    const result = await axios.get(API_URL + `/reviewCollection/${id}`)
    return result;
}