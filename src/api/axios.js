import axios from "axios";
const REACT_APP_BASE_URL = "http://localhost:5000/"
export default axios.create({
    baseURL:REACT_APP_BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL:REACT_APP_BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true
})