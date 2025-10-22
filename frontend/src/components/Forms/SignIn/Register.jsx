import React, { useEffect, useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Grid,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../../services/UserServices";
import Cookies from "js-cookie";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";

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
export default function Register({ setAlert }) {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        bio: "",
        email: "",
        password: "",
        phone: "",
        country: "",
        region: "",
        role: "user", // default role
    });
    const [errorForm, setErrorForm] = useState({
        first_name: "",
        last_name: "",
        bio: "",
        email: "",
        password: "",
        phone: "",
        country: "",
        region: "",
        role: "user", // default role
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        const user = JSON.parse(Cookies.get("user") || null);
        if (user) navigate("/");
    }, [navigate]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const mutation = useMutation({
        mutationFn: RegisterUser,
        onSuccess: (data) => {
            Cookies.set("user", data.data.id, { expires: 7 });
            setAlert(data.data.message, "success");
            navigate("/");
        },
        onError: (error) => {
            const errors = error.response.data.errors;
            setAlert(Object.entries(errors)[0][1][0], "error");
            Object.keys(errors).forEach((key) => {
                setErrorForm((prev) => ({ ...prev, [key]: errors[key][0] }));
            });
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        mutation.mutate(formData);
        setLoading(false);
    };

    const togglePassword = () => setShow((prev) => !prev);
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            p={2}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: 4,
                    bgcolor: "var(--color-gray-900)",
                    borderRadius: 2,
                    width: "100%",
                    maxWidth: "600px",
                }}
            >
                <Typography variant="h5" fontWeight="bold" textAlign="center">
                    Register
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            sx={fieldsetStyle}
                            label="First Name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                            fullWidth
                            error={!!errorForm.first_name}
                            helperText={errorForm.first_name || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            sx={fieldsetStyle}
                            label="Last Name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                            fullWidth
                            error={!!errorForm.last_name}
                            helperText={errorForm.last_name || ""}
                        />
                    </Grid>
                </Grid>

                <TextField
                    sx={fieldsetStyle}
                    label="Bio (optional)"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    fullWidth
                    rows={3}
                    error={!!errorForm.bio}
                    helperText={errorForm.bio || ""}
                />

                <TextField
                    sx={fieldsetStyle}
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    error={!!errorForm.email}
                    helperText={errorForm.email || ""}
                />

                <TextField
                    sx={fieldsetStyle}
                    label="Password"
                    name="password"
                    type={show ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    error={!!errorForm.password}
                    helperText={errorForm.password || ""}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={togglePassword}
                                    edge="end"
                                    sx={{ color: "white" }}
                                >
                                    {show ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    sx={fieldsetStyle}
                    label="Phone (optional)"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    error={!!errorForm.phone}
                    helperText={errorForm.phone || ""}
                />

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            sx={fieldsetStyle}
                            label="Country (optional)"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            fullWidth
                            error={!!errorForm.country}
                            helperText={errorForm.country || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            sx={fieldsetStyle}
                            label="Region (optional)"
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            fullWidth
                            error={!!errorForm.region}
                            helperText={errorForm.region || ""}
                        />
                    </Grid>
                </Grid>

                <Button
                    type="submit"
                    variant="contained"
                    className="btn"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </Button>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <div className="m-20">
                        <Link className="btn" to="/signin">
                            Back to Log In
                        </Link>
                    </div>
                    <div className="m-20">
                        <Link className="btn " to="/">
                            Back to Home
                        </Link>
                    </div>
                </Box>
            </Box>
        </Box>
    );
}
