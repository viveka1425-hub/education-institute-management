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

