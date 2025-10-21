import http from "../env/axios";

export const LoginUser = async (email, password) => {
    try {
        const response = await http.post("/api/login", { email, password });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const RegisterUser = async (data) => {
    const response = await http.post("/api/register", data);
    return response.data;
};
