import http from "../env/axios";

const RemoveUser = async (id) => {
    const response = await http.delete(`clients/${id}/delete`);
    return response.data;
};

const AddUserToCourse = async (data) => {
    const response = await http.post(`/user/add/course`, data);
    return response.data;
};

export { RemoveUser, AddUserToCourse };
