import http from "../env/axios";
import Cookies from "js-cookie";
const LoginUser = async ({ email, password }) => {
    const response = await http.post("/login", {
        email,
        password,
    });
    return response.data;
};

const RegisterUser = async (data) => {
    const response = await http.post("/register", data);
    return response.data;
};

const GetUser = async () => {
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

const UpdateUser = async (user) => {
    const response = await http.post("/user/update", user, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

const LogoutUser = async () => {
    const response = await http.post("/logout");
    return response.data;
};

const DeleteUser = async (password) => {
    const response = await http.post("/delete", password);
    return response.data;
};

export { LoginUser, RegisterUser, GetUser, UpdateUser, LogoutUser, DeleteUser };
