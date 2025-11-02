import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { LoginUser } from "../../../services/UserServices.jsx";
import { UserContext } from "../../../services/Contexts/userContext.jsx";

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
    // state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext);

    const [errorForm, setErrorForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    // functions
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [navigate, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
    };

    //query client
    const mutation = useMutation({
        mutationFn: LoginUser,
        onSuccess: (data) => {
            setLoading(false);
            if (data.status) {
                setUser(data.data);
                setAlert(data.message, "success");
                navigate("/");
            } else {
                setAlert(data.message, "error");
            }
        },
        onError: (err) => {
            setLoading(false);
            const errors = err.response.data.errors;
            setAlert(Object.entries(errors)[0][1][0], "error");
            Object.keys(errors).forEach((key) => {
                setErrorForm((prev) => ({ ...prev, [key]: errors[key][0] }));
            });
        },
    });
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
                className="bg-main"
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: 4,
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
                    onClick={() => {
                        mutation.mutate({ email, password });
                    }}
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
