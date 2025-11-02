import http from "../env/axios";

const GetCourses = async () => {
    const response = await http.get("/admin/courses");
    return response.data;
};

const PostCourse = async (course) => {
    try {
        const response = await http.post("/admin/courses/add", course);
        return response.data;
    } catch (err) {
        throw err || "";
    }
};

export const PatchCourse = async (course) => {
    const response = await http.patch(`/admin/courses/${course.id}`, course);
    return response.data;
};

export const DeleteCourse = async (id) => {
    try {
        const response = await http.delete(`/admin/courses/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export { GetCourses, PostCourse };
