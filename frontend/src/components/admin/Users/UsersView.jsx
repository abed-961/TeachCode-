import React, { useState } from "react";
import { Box, Modal, Button, TextField } from "@mui/material";
import UserComponent from "./UserComponent";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AllUser } from "../../../services/UserServices";
import { RemoveUser } from "../../../services/AdminServices";

export default function UsersView() {
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState();

    const { data: users, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: AllUser,
    });

    const DeleteUserMutation = useMutation({
        mutationFn: RemoveUser,
        mutationKey: ["users"],
        onSuccess: (res) => {
            refetch();
            console.log(res);
        },
        onError: (err) => console.log(err),
    });

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            {/* 🔍 Search Bar */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 4,
                    mt: 2,
                }}
            >
                <TextField
                    label="Search by Name"
                    variant="outlined"
                    InputProps={{
                        sx: { color: "white" },
                    }}
                    InputLabelProps={{
                        sx: { color: "white" },
                    }}
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                        width: { xs: "90%", sm: "60%", md: "40%" },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            "& fieldset": {
                                borderColor: "white",
                            },
                        },
                    }}
                />
            </Box>

            {/* 🧩 Users List */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    flexBasis: 300,
                    width: "100%",
                    justifyContent: "center",
                }}
            >
                {users &&
                    users
                        .filter((user) =>
                            user.first_name
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                        )
                        .map((user) => (
                            <UserComponent
                                key={user.id}
                                user={user}
                                setOpen={handleOpen}
                                setUserId={(id) => {
                                    setUserId(id);
                                }}
                            />
                        ))}
            </Box>

            {/* 🗑 Delete Modal */}
            <Modal
                className="bg-main"
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
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
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
                        Are you sure you want to delete this course?
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
                                DeleteUserMutation.mutate(userId);
                                handleClose();
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
