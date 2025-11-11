import axios from "axios";

// export const url = "http://192.168.10.55:8000";
export const url = "http://localhost:8000";

export const photoUrl = url + "/storage";

// Create a single reusable instance
const http = axios.create({
    baseURL: url + "/api",
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default http;
