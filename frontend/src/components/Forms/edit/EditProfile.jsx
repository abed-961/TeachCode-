import { useContext, useEffect, useState } from "react";
import {
    Box,
    TextField,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Typography,
    Paper,
    Modal,
} from "@mui/material";
import { Visibility, VisibilityOff, PhotoCamera } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { DeleteUser, UpdateUser } from "../../../services/UserServices";
import { photoUrl } from "../../../env/axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../services/Contexts/userContext";

const fieldsetStyle = {
    input: { color: "white" },
    label: { color: "white" },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "gray", // default border color
        },

        "&.Mui-focused fieldset": {
            borderColor: "var(--color-indigo-600)", // border when focused
            color: "white",
        },
    },
};

const inputStyle = {
    input: {
        color: "white !important",
        fontSize: "16px",
    },
    lable: {
        color: "white",
    },
    outline: {
        "& fieldset": { borderColor: "gray" },
        "&.Mui-focused fieldset": {
            borderColor: "var(--color-indigo-600) !important",
        },
    },
};

export default function ProfileSetting({ setAlert }) {
    const [open, setOpen] = useState();
    const [error, setError] = useState({});
    const [photo, setPhoto] = useState("hello");
    const [isChange, setIsChange] = useState(false);
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
    });
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        bio: "",
        phone: "",
        country: "",
        region: "",
        role: "user",
    });

    useEffect(() => {}, []);

    const [password, setPassword] = useState({
        current_password: "",
    });

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) setFormData(user);
    }, [user, navigate]);

    useEffect(() => {
        if (!passwordEmpty()) setIsChange(true);
        else setIsChange(false);
    }, [formData, photo]);

    const mutation = useMutation({
        mutationFn: UpdateUser,
        onSuccess: (res) => {
            setAlert(res.message, "success");
            setIsChange(false);
            setFormData((prev) => ({ ...prev, current_password: "" }));
        },
        onError: (error) => {
            const errors = error.response.data.errors;
            setAlert(Object.entries(errors)[0][1][0], "error");
            Object.keys(errors).forEach((key) => {
                setError((prev) => ({ ...prev, [key]: errors[key][0] }));
            });
            setIsChange(false);
            setTimeout(() => setError({}), 10000);
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    function passwordEmpty() {
        if (!formData.current_password) return true;
        return formData.current_password.length === 0;
    }

    const data = new FormData();
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
        }
    };

    const handleSubmit = (e) => {
        data.append("photo", photo);
        Object.keys(formData).forEach((key) => {
            if (key !== "photo") data.append(key, formData[key]);
        });

        e.preventDefault();

        mutation.mutate(data);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const mutationDelete = useMutation({
        mutationFn: DeleteUser,
        mutationKey: ["user"],
        onSuccess: (res) => {
            if (res.status) {
                setAlert(res.message, "success");
                setUser(false);
                navigate("/signin");
            } else {
                setAlert("Something Went Wrong", "error");
            }
        },
        onError: () => {
            setAlert("Something Went Wrong", "error");
        },
    });

    return (
        <Paper sx={{ p: 4, mx: "auto", m: 2 }} className="bg-main">
            <Typography variant="h5" gutterBottom color="white">
                Edit User Information
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3} className="w-100-c">
                    {/* Photo Upload */}
                    <Grid item xs={12} className="w-100-c" textAlign="center">
                        <div
                            style={{
                                width: "70%",
                                margin: "0 auto",
                                aspectRatio: "16 / 9",
                            }}
                        >
                            <img
                                src={
                                    photo instanceof File
                                        ? URL.createObjectURL(photo)
                                        : user
                                        ? user.photo
                                            ? photoUrl + user.photo
                                            : ""
                                        : ""
                                }
                                alt=""
                                style={{
                                    width: 300,
                                    height: 130,
                                    objectFit: "contain",
                                    borderRadius: 40,
                                }}
                            />
                        </div>
                        {error.photo && (
                            <small style={{ color: "red" }}>
                                {error.photo}
                            </small>
                        )}
                        <IconButton color="primary" component="label">
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handlePhotoChange}
                            />
                            <PhotoCamera />
                        </IconButton>
                    </Grid>

                    {/* Basic Info */}
                    <Grid item xs={12}>
                        <TextField
                            inputProps={inputStyle.input}
                            InputLabelProps={{
                                style: inputStyle.lable,
                            }}
                            InputProps={{
                                sx: inputStyle.outline,
                            }}
                            sx={fieldsetStyle}
                            name="first_name"
                            label="First Name"
                            fullWidth
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                            error={!!error.first_name}
                            helperText={error.first_name}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            inputProps={inputStyle.input}
                            InputLabelProps={{
                                style: inputStyle.lable,
                            }}
                            InputProps={{
                                sx: inputStyle.outline,
                            }}
                            sx={fieldsetStyle}
                            name="last_name"
                            label="Last Name"
                            fullWidth
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                            error={!!error.last_name}
                            helperText={error.last_name}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            inputProps={inputStyle.input}
                            InputLabelProps={{
                                style: inputStyle.lable,
                            }}
                            InputProps={{
                                sx: inputStyle.outline,
                            }}
                            sx={fieldsetStyle}
                            name="bio"
                            rows={2}
                            label="Bio"
                            fullWidth
                            value={formData.bio}
                            onChange={handleChange}
                            error={!!error.bio}
                            helperText={error.bio}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            inputProps={inputStyle.input}
                            InputLabelProps={{
                                style: inputStyle.lable,
                            }}
                            InputProps={{
                                sx: inputStyle.outline,
                            }}
                            sx={fieldsetStyle}
                            name="phone"
                            label="Phone"
                            fullWidth
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            error={!!error.phone}
                            helperText={error.phone}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            inputProps={inputStyle.input}
                            InputLabelProps={{
                                style: inputStyle.lable,
                            }}
                            InputProps={{
                                sx: inputStyle.outline,
                            }}
                            sx={fieldsetStyle}
                            name="country"
                            label="Country"
                            fullWidth
                            value={formData.country}
                            onChange={handleChange}
                            error={!!error.country}
                            helperText={error.country}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            inputProps={inputStyle.input}
                            InputLabelProps={{
                                style: inputStyle.lable,
                            }}
                            InputProps={{
                                sx: inputStyle.outline,
                            }}
                            sx={fieldsetStyle}
                            name="region"
                            label="Region"
                            fullWidth
                            value={formData.region}
                            onChange={handleChange}
                            required
                            error={!!error.region}
                            helperText={error.region}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            inputProps={inputStyle.input}
                            InputLabelProps={{
                                style: inputStyle.lable,
                            }}
                            InputProps={{
                                sx: inputStyle.outline,
                            }}
                            sx={fieldsetStyle}
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                            required
                            error={!!error.email}
                            helperText={error.email}
                        />
                    </Grid>

                    {/* Password Fields */}
                    <Grid item xs={12}>
                        <TextField
                            inputProps={inputStyle.input}
                            InputLabelProps={{
                                style: inputStyle.lable,
                            }}
                            sx={fieldsetStyle}
                            name="current_password"
                            label="Current Password"
                            type={showPassword.current ? "text" : "password"}
                            fullWidth
                            value={formData.current_password}
                            onChange={handleChange}
                            error={!!error.current_password}
                            helperText={error.current_password}
                            InputProps={{
                                sx: inputStyle.outline,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            sx={{ color: "white" }}
                                            onClick={() =>
                                                setShowPassword((p) => ({
                                                    ...p,
                                                    current: !p.current,
                                                }))
                                            }
                                            edge="end"
                                        >
                                            {showPassword.current ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Box textAlign="center">
                        <small style={{ color: "red" }}>
                            {" "}
                            make sure to type your password with any changing
                        </small>
                    </Box>

                    <Grid item xs={12}>
                        <TextField
                            inputProps={inputStyle.input}
                            InputLabelProps={{
                                style: inputStyle.lable,
                            }}
                            sx={fieldsetStyle}
                            name="new_password"
                            label="New Password"
                            type={showPassword.new ? "text" : "password"}
                            fullWidth
                            value={formData.newPassword}
                            onChange={handleChange}
                            error={!!error.new_password}
                            helperText={error.new_password}
                            InputProps={{
                                sx: inputStyle.outline,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            sx={{ color: "white" }}
                                            onClick={() =>
                                                setShowPassword((p) => ({
                                                    ...p,
                                                    new: !p.new,
                                                }))
                                            }
                                            edge="end"
                                        >
                                            {showPassword.new ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            disabled={!isChange}
                            type="submit"
                            variant="contained"
                            fullWidth
                            className="btn"
                            size="large"
                        >
                            {" "}
                            Save Changes
                        </Button>
                        <p style={{ color: "white", textAlign: "center" }}>
                            Please Change Your Information And Type your current
                            Password Before Submiting
                        </p>
                    </Grid>
                </Grid>
            </Box>
            <Grid
                item
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 2,
                }}
            >
                <Button
                    className="btn"
                    variant="outlined"
                    size="small"
                    sx={{
                        textTransform: "none",
                        borderColor: "#dbdbdb",
                        color: "white",
                        margin: "0 auto",
                    }}
                    onClick={handleOpen}
                >
                    Delete Account
                </Button>
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { xs: "90%", sm: 400 },
                        backgroundColor: "var(--color-gray-950) !important",
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                        background: "rgba(30,30,30,0.95)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                    }}
                >
                    <h2
                        id="child-modal-title"
                        style={{
                            textAlign: "center",
                            color: "#ff5252",
                            fontWeight: 600,
                            fontSize: "1.3rem",
                            marginBottom: "10px",
                        }}
                    >
                        Are you sure you want to delete your account?
                    </h2>

                    {/* Password Field */}
                    <Grid item xs={12} sx={{ width: "100%" }}>
                        <TextField
                            onChange={(e) => {
                                setPassword({
                                    current_password: e.target.value,
                                });
                            }}
                            inputProps={{
                                style: { color: "white", fontSize: "0.9rem" },
                            }}
                            InputLabelProps={{
                                style: { color: "#ccc", fontSize: "0.9rem" },
                            }}
                            sx={{
                                width: "100%",
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "#666" },
                                    "&:hover fieldset": { borderColor: "#aaa" },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#ff5252",
                                    },
                                },
                            }}
                            name="current_password"
                            label="Current Password"
                            type={showPassword.current ? "text" : "password"}
                            fullWidth
                            value={password.current_password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            sx={{ color: "#ccc" }}
                                            onClick={() =>
                                                setShowPassword((p) => ({
                                                    ...p,
                                                    current: !p.current,
                                                }))
                                            }
                                            edge="end"
                                        >
                                            {showPassword.current ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Buttons */}
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
                                mutationDelete.mutate(password);
                                handleClose();
                            }}
                            variant="contained"
                            sx={{
                                flex: 1,
                                bgcolor: "#ff1744",
                                "&:hover": { bgcolor: "#d50000" },
                                color: "white",
                                fontWeight: "bold",
                                textTransform: "none",
                                py: 1,
                            }}
                        >
                            Delete
                        </Button>

                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            sx={{
                                flex: 1,
                                borderColor: "#888",
                                color: "#ddd",
                                fontWeight: "bold",
                                textTransform: "none",
                                py: 1,
                                "&:hover": {
                                    borderColor: "#ccc",
                                    backgroundColor: "rgba(255,255,255,0.05)",
                                },
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Paper>
    );
}
