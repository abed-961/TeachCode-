
import http from "../env/axios";
import Cookies from "js-cookie";
export const LoginUser = async ({ email, password }) => {
    const response = await http.post("/login", {
        email,
        password,
    });
    return response.data;
};

export const RegisterUser = async (data) => {
    const response = await http.post("/register", data);
    return response.data;
};

// eslint-disable-next-line react-refresh/only-export-components
export const getUser = async () => {
    try {
        const response = await http.get("/user");
        return response.data;
    } catch (err) {
        if (err.status === 401) {
            Cookies.remove("user");
            throw "error 401";
        }
        return null;
    }
};

// eslint-disable-next-line react-refresh/only-export-components
export const updateUser = async (user) => {
    const response = await http.post("/user/update", user, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
