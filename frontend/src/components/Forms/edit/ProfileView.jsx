import React, { useContext, useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Typography,
    Grid,
    Divider,
    Button,
    Modal,
} from "@mui/material";
import { UserContext } from "../../../services/Contexts/userContext";
import { photoUrl } from "../../../env/axios";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { LogoutUser } from "../../../services/UserServices";
//icons
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

export default function ProfileView({ setAlert }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    //user Data Context
    const { user, setUser, isLoading } = useContext(UserContext);

    // mutation
    const mutation = useMutation({
        mutationFn: LogoutUser,
        onSuccess: (res) => {
            if (res.status) {
                setUser(false);
                setAlert(res.message, "success");
                navigate("/signin");
            } else {
                setAlert("Something went Wrong ", "error");
            }
        },
        onError: () => setAlert("Something went Wrong ", "error"),
    });

    const logoutSubmit = () => {
        mutation.mutate();
    };

    // check if logged IN
    useEffect(() => {
        if (isLoading) return;
        if (user === null) {
            navigate("/signin");
        }
    }, [user, isLoading]);

    // Logout modal  section
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    if (!user) {
        return null;
    }

    return (
        <Box
            sx={{
                maxWidth: 900,
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            className="h-100"
        >
            {/* Top Section (Profile Header) */}
            <Grid
                container
                spacing={4}
                alignItems="center"
                className="c-white-child"
            >
                {/* Profile Photo */}
                <Grid item xs={12} sm={4} textAlign="center">
                    <Avatar
                        alt={user.first_name}
                        src={photoUrl + user.photo}
                        sx={{
                            width: 140,
                            height: 140,
                            margin: "auto",
                            border: "3px solid #dbdbdb",
                        }}
                    />
                </Grid>

                {/* User Info */}
                <Grid item xs={12} sm={8}>
                    <Box
                        display="flex"
                        alignItems="center"
                        flexWrap="wrap"
                        gap={2}
                        mb={1}
                    >
                        <Typography variant="h5">
                            {user.first_name} {user.last_name}
                        </Typography>
                        <Link
                            to="/profile/setting"
                            className="btn"
                            variant="outlined"
                            size="small"
                            sx={{
                                textTransform: "none",
                                borderColor: "#dbdbdb",
                            }}
                        >
                            <SettingsIcon className="c-icon" />
                        </Link>
                    </Box>

                    <Typography fontWeight="bold">{user.role}</Typography>
                    {user.bio && (
                        <Typography color="text.secondary" mt={0.5}>
                            Bio : {user.bio}
                        </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                        📍 {user.region} {user.country && `, ${user.country}`}
                    </Typography>
                </Grid>
            </Grid>
            <Divider sx={{ my: 4, width: "100%", borderColor: "#efefef" }} />
            <Typography variant="caption" color="white" display="block" mt={4}>
                Member since{" "}
                {new Date(user.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })}
            </Typography>
            <Grid container spacing={12} sx={{ marginTop: "auto" }}>
                <Grid item lg={12}>
                    <Button
                        className="btn"
                        variant="outlined"
                        size="small"
                        sx={{
                            textTransform: "none",
                            borderColor: "#dbdbdb",
                            color: "red !important",
                        }}
                        onClick={handleOpen}
                    >
                        <LogoutIcon sx={{ color: "red", mr: 1 }} /> logout
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        className="btn"
                        variant="outlined"
                        size="small"
                        sx={{
                            textTransform: "none",
                            borderColor: "#dbdbdb",
                            color: "white",
                        }}
                        onClick={() => {
                            navigate("/profile/setting");
                        }}
                    >
                        <SettingsIcon className="c-icon" /> Profile
                    </Button>
                </Grid>
            </Grid>
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
                        Are you sure you want to log out?
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
                                logoutSubmit();
                            }}
                            variant="contained"
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
                            Logout
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
        </Box>
    );
}
