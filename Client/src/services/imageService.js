import axios from 'axios';
import { API_URL } from "../config/config";

export async function uploadImage(image) {
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post(API_URL + "/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
    return result;
}