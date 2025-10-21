import axios from "axios";

export async function getUsersData(){
    const result = await axios.get("http://localhost:7007/pending")
    return result;
}