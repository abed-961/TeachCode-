import React, { useState, useEffect, useContext } from "react";
import {
    Box,
    TextField,
    Typography,
    Grid,
    MenuItem,
    Button,
    Chip,
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
            borderColor: "gray",
        },
        "&.Mui-focused fieldset": {
            borderColor: "gray",
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
        instructor_id: 0,
        outcomes: [],
    });
    const [outcomeInput, setOutcomeInput] = useState("");

    useEffect(() => {
        if (!course) {
            nav("/admin/courses");
            return;
        }
        // normalize outcomes to array
        setFormData({
            ...course,
            outcomes: course.outcomes.map((e) => e.description),
            instructor_id: course.instructor?.id || 0,
        });
    }, [nav, course]);

    const { data: instructors } = useQuery({
        queryKey: ["instructors"],
        queryFn: GetInstructors,
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle outcomes safely
    const handleAddOutcome = () => {
        const val = outcomeInput.trim();
        if (!val) return;
        setFormData((prev) => ({
            ...prev,
            outcomes: Array.isArray(prev.outcomes)
                ? [...prev.outcomes, val]
                : [val],
        }));
        setOutcomeInput("");
    };

    const handleRemoveOutcome = (index) => {
        setFormData((prev) => ({
            ...prev,
            outcomes: Array.isArray(prev.outcomes)
                ? prev.outcomes.filter((_, i) => i !== index)
                : [],
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
            sx={{ mx: "auto", mt: 4, p: 4 }}
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
                            sx: { color: "white" },
                        }}
                        InputLabelProps={{
                            sx: { color: "white" },
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
                        value={formData.instructor_id || 0}
                        onChange={handleChange}
                        InputProps={{
                            sx: { color: "white" },
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

                {/* Outcomes Section */}
                <Grid item xs={12}>
                    <Typography sx={{ color: "white", mb: 1 }}>
                        Outcomes
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                            mb: 1,
                        }}
                    >
                        <TextField
                            sx={{
                                ...fieldsetStyle,
                                flex: 1,
                            }}
                            label="Add Outcome"
                            value={outcomeInput}
                            onChange={(e) => setOutcomeInput(e.target.value)}
                            InputProps={{
                                sx: { color: "white" },
                            }}
                            InputLabelProps={{
                                sx: { color: "white" },
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddOutcome}
                            sx={{ whiteSpace: "nowrap" }}
                        >
                            Add
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            maxHeight: 150,
                            overflowY: "auto",
                        }}
                    >
                        {Array.isArray(formData.outcomes) &&
                            formData.outcomes.map((out, i) => (
                                <Chip
                                    key={i}
                                    label={out}
                                    onDelete={() => handleRemoveOutcome(i)}
                                    color="primary"
                                    sx={{
                                        color: "white",
                                    }}
                                />
                            ))}
                    </Box>
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
