import axios from "axios";

// Create a single reusable instance
const api = axios.create({
    baseURL: "http://localhost:8000", // Laravel backend URL
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: "application/json",
    },
});

export default api;


