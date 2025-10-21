import axios from "axios";

export async function loginProfile(profileData) {
    const result = await axios.post("http://localhost:7007/login", profileData)
    return result;
}

export async function userRegister(name, email, phone, password, role) {
    const result = await axios.post("http://localhost:7007/register", {
        name: name,
        email: email,
        phone: phone,
        password: password,
        role: role
    })
    return result;
}

export async function userLogin(email, password) {
    const res = await axios.post("http://localhost:7007/login", {
        email: email,
        password: password
    })
    return res;
}
