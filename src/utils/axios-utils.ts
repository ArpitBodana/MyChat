import axios from "axios";
const URL = import.meta.env.VITE_API_KEY;
const client = axios.create({ baseURL: URL })

export const axiosFetch = ({ ...options }) => {
    const user = localStorage.getItem('user');
    let token = ""
    if (user) {
        const userData = JSON.parse(user);
        token = userData.access_token
    }
    client.defaults.headers.common.Authorization = `Bearer ${token}`
    return client(options)
}



