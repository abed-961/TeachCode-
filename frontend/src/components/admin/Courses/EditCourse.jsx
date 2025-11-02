import React, { useState, useEffect, useContext } from "react";
import {
    Box,
    TextField,
    Typography,
    Grid,
    MenuItem,
    Button,
} from "@mui/material";
import { CourseContext } from "../../../services/Contexts/CourseContext";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PatchCourse } from "../../../services/CoursesService";
import { GetInstructors } from "../../../services/InstructorService";

const fieldsetStyle = {
    input: { color: "white" },
    label: { color: "white" },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "gray", // default border color
        },

        "&.Mui-focused fieldset": {
            borderColor: "gray", // border when focused
        },
    },
};

export default function EditCourseForm({ setAlert }) {
    const nav = useNavigate();
    const { course } = useContext(CourseContext);
    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        teaching_hours: "",
        duration_weeks: "",
        description: "",
        instructor: { name: "", id: 0 },
    });

    useEffect(() => {
        if (!course) {
            nav("/admin/courses");
            return;
        }
        setFormData(course);
        setFormData((prev) => ({ ...prev, instructor: null }));
    }, [nav, course]);

    const { data: instructors } = useQuery({
        queryKey: ["instructors"],
        queryFn: GetInstructors,
    });
    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const EditMutation = useMutation({
        mutationFn: PatchCourse,
        onSuccess: (res) => {
            if (res.status) {
                setAlert(res.message, "success");
                nav("/admin/courses");
            } else {
                setAlert("Something Went Wrong!", "error");
            }
        },
        onError: () => {
            setAlert("Something Went Wrong!", "error");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        EditMutation.mutate(formData);
    };

    return (
        <Box
            sx={{ mx: "auto", mt: 4 }}
            className="w-100 bg-main"
            component="form"
            onSubmit={handleSubmit}
        >
            <Typography variant="h5" mb={3}>
                Edit Course
            </Typography>

            <Grid container spacing={2} className="course-form-container">
                <Grid item xs={12}>
                    <TextField
                        sx={fieldsetStyle}
                        name="name"
                        label="Course Name"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        sx={fieldsetStyle}
                        name="description"
                        label="Description"
                        fullWidth
                        multiline
                        minRows={2}
                        value={formData.description}
                        onChange={handleChange}
                        InputProps={{
                            sx: {
                                color: "white", // text color
                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                color: "white", // label color
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        sx={fieldsetStyle}
                        name="teaching_hours"
                        label="Teaching Hours"
                        type="number"
                        fullWidth
                        value={formData.teaching_hours}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        sx={fieldsetStyle}
                        name="duration_weeks"
                        label="Duration (Weeks)"
                        type="number"
                        fullWidth
                        value={formData.duration_weeks}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        sx={fieldsetStyle}
                        select
                        name="instructor_id"
                        label="Instructor"
                        fullWidth
                        value={
                            formData
                                ? formData.instructor_id
                                    ? formData.instructor_id
                                    : 0
                                : 0
                        }
                        onChange={handleChange}
                        InputProps={{
                            sx: {
                                color: "white", // text color
                            },
                        }}
                    >
                        <MenuItem key={0} value={0} disabled>
                            Choose one instructor
                        </MenuItem>
                        {instructors &&
                            instructors.map((user) => (
                                <MenuItem
                                    key={user.instructor.id}
                                    value={user.instructor.id}
                                >
                                    {user.first_name + " _ " + user.last_name}
                                </MenuItem>
                            ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sx={{ gridColumn: "span 2" }}>
                    <Button
                        className="btn"
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                    >
                        Save Changes
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
