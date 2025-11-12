import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    MenuItem,
    Stack,
    Chip
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostCourse } from "../../../services/CoursesService";
import { useNavigate } from "react-router-dom";
import { GetInstructors } from "../../../services/InstructorService";

export default function CourseForm({ setAlert }) {
    const nav = useNavigate();
    const [outcomeInput, setOutcomeInput] = useState("");
    const [errorForm, setErrorForm] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        teaching_hours: "",
        duration_weeks: "",
        description: "",
        instructor_id: "",
        payment: "",
        start_date: "",
        outcomes : ""
    });

    const { data: instructors, isLoading } = useQuery({
        queryKey: ["instructors"],
        queryFn: GetInstructors,
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    // 🆕 Add new outcome
    const handleAddOutcome = () => {
        if (outcomeInput.trim() === "") return;
        setFormData((prev) => ({
            ...prev,
            outcomes: [...prev.outcomes, outcomeInput.trim()],
        }));
        setOutcomeInput("");
    };

    // 🆕 Remove outcome
    const handleRemoveOutcome = (index) => {
        setFormData((prev) => ({
            ...prev,
            outcomes: prev.outcomes.filter((_, i) => i !== index),
        }));
    };

    const addCourseMutation = useMutation({
        mutationFn: PostCourse,
        onSuccess: (res) => {
            if (res.status) {
                setErrorForm({});
                setAlert(res.message, "success");
                nav("/admin/courses");
            } else {
                setAlert("Something Went Wrong!", "error");
            }
        },
        onError: (error) => {
            setAlert("Something Went Wrong!", "error");
            const errors = error.response.data.errors;
            Object.keys(errors).forEach((key) => {
                setErrorForm((prev) => ({
                    ...prev,
                    [key]: errors[key][0],
                }));
            });
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        addCourseMutation.mutate(formData);
    };

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

    if (isLoading) return <div>Loading Data ...</div>;

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mx: "auto", mt: 4, width: "80%", minWidth: 300 }}
            className="bg-main"
        >
            <Typography variant="h5" mb={3}>
                Create New Course
            </Typography>

            <Grid container className="course-form-container" spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        sx={fieldsetStyle}
                        name="name"
                        label="Course Name"
                        fullWidth
                        required
                        error={!!errorForm.name}
                        helperText={errorForm.name || ""}
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
                        required
                        multiline
                        minRows={2}
                        value={formData.description}
                        error={!!errorForm.description}
                        helperText={errorForm.description || ""}
                        onChange={handleChange}
                        InputProps={{
                            sx: { color: "white" },
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        sx={fieldsetStyle}
                        name="teaching_hours"
                        label="Teaching Hours"
                        type="number"
                        fullWidth
                        required
                        error={!!errorForm.teaching_hours}
                        helperText={errorForm.teaching_hours || ""}
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
                        required
                        error={!!errorForm.duration_weeks}
                        helperText={errorForm.duration_weeks || ""}
                        value={formData.duration_weeks}
                        onChange={handleChange}
                    />
                </Grid>

                {/* 🆕 Payment Field */}
                <Grid item xs={6}>
                    <TextField
                        sx={fieldsetStyle}
                        name="payment"
                        label="Payment ($)"
                        type="number"
                        fullWidth
                        required
                        error={!!errorForm.payment}
                        helperText={errorForm.payment || ""}
                        value={formData.payment}
                        onChange={handleChange}
                    />
                </Grid>

                {/* 🆕 Starting Date Field */}
                <Grid item xs={6}>
                    <TextField
                        sx={fieldsetStyle}
                        name="start_date"
                        label="Starting Date"
                        type="date"
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                        error={!!errorForm.start_date}
                        helperText={errorForm.start_date || ""}
                        value={formData.start_date}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        sx={[fieldsetStyle, { color: "white" }]}
                        select
                        name="instructor_id"
                        label="Instructor"
                        fullWidth
                        required
                        value={formData.instructor_id}
                        onChange={handleChange}
                        error={!!errorForm.instructor_id}
                        helperText={errorForm.instructor_id || ""}
                        InputProps={{
                            sx: { color: "white" },
                        }}
                    >
                        {instructors && instructors.length > 0 ? (
                            instructors.map((ins) => (
                                <MenuItem
                                    key={ins.instructor.id}
                                    value={ins.instructor.id}
                                >
                                    {ins.first_name + " " + ins.last_name}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem key={0} value={0}>
                                No Instructors Available
                            </MenuItem>
                        )}
                    </TextField>
                </Grid>
                {/* 🆕 Outcomes Field */}
                <Grid item xs={12}>
                    <Typography variant="h6" mt={2} mb={1}>
                        Outcomes
                    </Typography>
                    <Box display="flex" gap={2}>
                        <TextField
                            sx={fieldsetStyle}
                            label="Add an outcome"
                            value={outcomeInput}
                            onChange={(e) => setOutcomeInput(e.target.value)}
                            fullWidth
                        />
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleAddOutcome}
                        >
                            Add
                        </Button>
                    </Box>

                    <Stack direction="row" flexWrap="wrap" gap={1} mt={2}>
                        {formData.outcomes &&
                            formData.outcomes.map((out, i) => (
                                <Chip
                                    key={i}
                                    label={out}
                                    color="primary"
                                    onDelete={() => handleRemoveOutcome(i)}
                                />
                            ))}
                    </Stack>

                    {errorForm.outcomes && (
                        <Typography color="error" variant="body2" mt={1}>
                            {errorForm.outcomes}
                        </Typography>
                    )}
                </Grid>

                <Grid item xs={12} sx={{ gridColumn: "span 2" }}>
                    <Button
                        className="btn"
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                    >
                        Create Course
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
