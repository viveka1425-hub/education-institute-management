import axios from "axios";

export async function getUsersData() {
    const result = await axios.get("http://localhost:7007/pending")
    return result;
}

export async function updateUserStatus(userId, action) {
    const body = {
        action: action
    }
    const result = await axios.put(`http://localhost:7007/status/${userId}`, body);
    return result;
}

