import axios from "axios";

// Create a single reusable instance
const http = axios.create({
    baseURL: "http://localhost:8000", // Laravel backend URL
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default http;
