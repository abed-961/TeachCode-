import { useContext, useEffect, useState } from "react";
import { Box, Typography, Grid, TextField, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
    DeleteInstructor,
    EditInstructor,
} from "../../../services/InstructorService";
import { InstructorContext } from "../../../services/Contexts/InstructorContext";
import { useMutation } from "@tanstack/react-query";

export default function Instructor_Edit({ setAlert }) {
    const [open, setOpen] = useState(false);
    const { instructor, setInstructor } = useContext(InstructorContext);
    const nav = useNavigate();
    const [errorForm, setErrorForm] = useState({});
    const [formData, setFormData] = useState({
        id: 0,
        email: "",
        updated_at: "",
        first_name: "",
        last_name: "",
        bio: "",
        photo: "",
        phone: "",
        country: "",
        region: "",
        role: "",
        deleted_at: null,
        instructor: {
            id: 0,
            user_id: 0,
            company_name: "",
            price: 0,
            experience_years: 0,
            created_at: "",
            updated_at: "",
        },
    });
    useEffect(() => {
        if (!instructor) {
            nav("/admin/instructor");
        }
        setFormData(instructor.instructor);
        setFormData((prev) => ({
            ...prev,
            name: instructor.first_name + " " + instructor.last_name,
        }));
    }, [instructor, nav]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const EditInstructorMutation = useMutation({
        mutationFn: EditInstructor,
        mutationKey: ["instructors"],
        onSuccess: (res) => {
            if (res.status) {
                setAlert(res.message, "success");
                nav("/admin/instructor");
            } else {
                setAlert(res.message, "error");
            }
        },
        onError: () => {
            setAlert("Somthing Went Wrong", "error");
        },
    });

    const deleteInstructorMutation = useMutation({
        mutationFn: DeleteInstructor,
        mutationKey: ["instructor"],
        onSuccess: (res) => {
            if (res.status) {
                setInstructor(false);
                setAlert(res.message, "success");
                nav("/admin/instructor");
            } else {
                setAlert(res.message, "error");
            }
        },
        onError: (err) => {
            const errors = err.response.data.errors;
            setAlert(Object.entries(errors)[0][1][0], "error");
            Object.keys(errors).forEach((key) => {
                setErrorForm((prev) => ({ ...prev, [key]: errors[key][0] }));
            });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        EditInstructorMutation.mutate(formData);
    };

    const fieldsetStyle = {
        input: { color: "white" },
        label: { color: "white" },
        "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "gray" },
            "&.Mui-focused fieldset": { borderColor: "gray" },
        },
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mx: "auto", mt: 4, width: "80%", minWidth: 300 }}
                className="bg-main "
            >
                <Typography variant="h5" mb={3}>
                    Edit Instructor
                </Typography>

                <Grid container spacing={2} className="instructor-form">
                    <Grid item xs={12}>
                        <TextField
                            sx={[fieldsetStyle, { color: "white" }]}
                            name="user_id"
                            label="User"
                            fullWidth
                            required
                            value={formData.name}
                            error={!!errorForm.user_id}
                            helperText={errorForm.user_id || ""}
                            InputProps={{
                                readOnly: true,
                                sx: {
                                    color: "white",
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            sx={fieldsetStyle}
                            name="company_name"
                            label="Company Name"
                            fullWidth
                            required
                            value={formData.company_name}
                            onChange={handleChange}
                            error={!!errorForm.company_name}
                            helperText={errorForm.company_name || ""}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            sx={fieldsetStyle}
                            name="price"
                            label="Price"
                            type="number"
                            fullWidth
                            required
                            value={formData.price}
                            onChange={handleChange}
                            error={!!errorForm.price}
                            helperText={errorForm.price || ""}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            sx={fieldsetStyle}
                            name="experience_years"
                            label="Experience (Years)"
                            type="number"
                            fullWidth
                            required
                            value={formData.experience_years}
                            onChange={handleChange}
                            error={!!errorForm.experience_years}
                            helperText={errorForm.experience_years || ""}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ display: "flex", gap: 4 }}>
                        <Button
                            className="btn"
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                        >
                            edit Instructor
                        </Button>
                        <Button
                            sx={{ color: "red" }}
                            className="btn"
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleOpen}
                        >
                            Delete Instructor
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="logout-modal-title"
                aria-describedby="logout-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { xs: "90%", sm: 380 },
                        backgroundColor: "var(--color-gray-950) !important",
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                        background: "rgba(255, 255, 255, 0.97)", // light mode style
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <h2
                        id="logout-modal-title"
                        style={{
                            textAlign: "center",
                            color: "#e53935",
                            fontWeight: 600,
                            fontSize: "1.3rem",
                            marginBottom: "8px",
                        }}
                    >
                        Are you sure you want to delete this course .
                    </h2>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 2,
                            width: "100%",
                            mt: 2,
                        }}
                    >
                        <Button
                            onClick={() => {
                                handleClose();
                                deleteInstructorMutation.mutate(
                                    formData.instructor.id
                                );
                            }}
                            variant="containedF"
                            sx={{
                                flex: 1,
                                bgcolor: "#e53935",
                                "&:hover": { bgcolor: "#c62828" },
                                color: "white",
                                fontWeight: "bold",
                                textTransform: "none",
                                py: 1.1,
                                borderRadius: 2,
                                boxShadow: "0 2px 6px rgba(229,57,53,0.4)",
                            }}
                        >
                            Delete
                        </Button>

                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            sx={{
                                flex: 1,
                                borderColor: "#bbb",
                                color: "#555",
                                fontWeight: "bold",
                                textTransform: "none",
                                py: 1.1,
                                borderRadius: 2,
                                "&:hover": {
                                    borderColor: "#999",
                                    backgroundColor: "rgba(0,0,0,0.03)",
                                },
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
