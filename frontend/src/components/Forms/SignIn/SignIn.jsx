import React, { useEffect, useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import http from "../../../env/axios.jsx";
import Cookies from "js-cookie";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
export default function Login({ setAlert }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const [errorForm, setErrorForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(Cookies.get("user") || null);
        if (user) {
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        signIn();
    };

    async function signIn() {
        let data = "";
        try {
            data = await http.post("/api/login", {
                email: email,
                password: password,
            });
        } catch (error) {
            setAlert("failed to log in ", "error");
            const errors = error.response.data.errors;

            Object.keys(errors).forEach((key) => {
                setErrorForm((prev) => ({ ...prev, [key]: errors[key][0] }));
            });
        } finally {
            setLoading(false);
            if (data)
                if (data.data.status) {
                    Cookies.set("user", JSON.stringify(data.data.data.id), {
                        expires: 7,
                    });
                    setAlert(data.data.message, "success");
                    navigate("/");
                } else {
                    setAlert(data.data.message, "error");
                }
        }
    }
    const togglePassword = () => setShow((prev) => !prev);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            p={2}
            sx={{ zIndex: 1 }}
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
                    maxWidth: "500px",
                }}
            >
                <Typography variant="h5" fontWeight="bold" textAlign="center">
                    Login
                </Typography>

                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={fieldsetStyle}
                    error={!!errorForm.email}
                    helperText={errorForm.email}
                />

                <TextField
                    label="Password"
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={fieldsetStyle}
                    error={!!errorForm.password}
                    helperText={errorForm.password}
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

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    className="btn"
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    mt={1}
                    fontSize="0.9rem"
                >
                    <Link className="btn" to="/">
                        Home
                    </Link>
                    <Box>
                        Don't have an account?{" "}
                        <Link className="btn " to="/register">
                            Register
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
