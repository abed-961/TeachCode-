import http from "../env/axios";

export const LoginUser = async ({ email, password }) => {
    const response = await http.post("/api/login", {
        email,
        password,
    });
    return response.data;
};

export const RegisterUser = async (data) => {
    const response = await http.post("/api/register", data);
    return response.data;
};
