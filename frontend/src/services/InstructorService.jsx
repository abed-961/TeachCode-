import http from "../env/axios";

const GetInstructors = async () => {
    const response = await http.get("/admin/instructor");
    return response.data;
};

const StoreInstructor = async (data) => {
    const response = await http.post("/admin/instructor/store", data);
    return response.data;
};

const EditInstructor = async (data) => {
    const response = await http.patch("/admin/instructor/edit", data);
    return response.data;
};

const DeleteInstructor = async (id) => {
    const response = await http.delete(`/admin/${id}/instructor`);
    return response.data;
};

export { GetInstructors, StoreInstructor, DeleteInstructor, EditInstructor };
