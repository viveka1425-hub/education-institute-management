import axios from "axios";
import { API_URL } from "../config/config";

export async function loginProfile(profileData) {
    const result = await axios.post(API_URL + "/login", profileData)
    return result;
}

export async function userRegister(name, email, phone, password, role) {
    const result = await axios.post(API_URL + "/register", {
        name: name,
        email: email,
        phone: phone,
        password: password,
        role: role
    })
    return result;
}

export async function userLogin(email, password) {
    const res = await axios.post(API_URL + "/login", {
        email: email,
        password: password
    })
    return res;
}
