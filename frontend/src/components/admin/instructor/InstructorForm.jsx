import { useContext, useState } from "react";
import {
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    MenuItem,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AllUser } from "../../../services/UserServices";
import { UserContext } from "../../../services/Contexts/userContext";
import { StoreInstructor } from "../../../services/InstructorService";

export default function InstructorForm({ setAlert }) {
    const nav = useNavigate();
    const { user } = useContext(UserContext);
    const [errorForm, setErrorForm] = useState({});
    const [formData, setFormData] = useState({
        user_id: "",
        company_name: "",
        price: "",
        experience_years: "",
    });

    const { data: users } = useQuery({
        queryFn: AllUser,
        queryKey: ["users"],
    });
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const addInstructorMutation = useMutation({
        mutationFn: StoreInstructor,
        onSuccess: (res) => {
            if (res.status) {
                setErrorForm({});
                setAlert(res.message, "success");
                nav("/admin/instructor");
            } else {
                setAlert("Something went wrong!", "error");
            }
        },
        onError: (error) => {
            setAlert("Validation Error", "error");
            const errors = error?.response?.data?.errors || {};
            Object.keys(errors).forEach((key) => {
                setErrorForm((prev) => ({
                    ...prev,
                    [key]: errors[key][0],
                }));
            });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addInstructorMutation.mutate(formData);
    };

    const fieldsetStyle = {
        input: { color: "white" },
        label: { color: "white" },
        "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "gray" },
            "&.Mui-focused fieldset": { borderColor: "gray" },
        },
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mx: "auto", mt: 4, width: "80%", minWidth: 300 }}
            className="bg-main "
        >
            <Typography variant="h5" mb={3}>
                Add New Instructor
            </Typography>

            <Grid container spacing={2} className="instructor-form">
                <Grid item xs={12}>
                    <TextField
                        sx={[fieldsetStyle, { color: "white" }]}
                        select
                        name="user_id"
                        label="Select User"
                        fullWidth
                        required
                        value={formData.user_id}
                        onChange={handleChange}
                        error={!!errorForm.user_id}
                        helperText={errorForm.user_id || ""}
                        InputProps={{
                            sx: {
                                color: "white",
                            },
                        }}
                    >
                        {users ? (
                            users.map(
                                (u) =>
                                    u.id !== user.id && (
                                        <MenuItem key={u.id} value={u.id}>
                                            {u.first_name} - {u.last_name}
                                        </MenuItem>
                                    )
                            )
                        ) : (
                            <MenuItem>there is not any User</MenuItem>
                        )}
                    </TextField>
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

                <Grid item xs={12}>
                    <Button
                        className="btn"
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                    >
                        Create Instructor
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
