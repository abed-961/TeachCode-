import React, { useContext, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    IconButton,
    Modal,
    Box,
    Button,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    DeleteInstructor,
    GetInstructors,
} from "../../../services/InstructorService";
import { InstructorContext } from "../../../services/Contexts/InstructorContext";

export default function Instructor_View({ setAlert }) {
    const [instructorId, setInstructorId] = useState();
    const { setInstructor } = useContext(InstructorContext);
    const nav = useNavigate();
    const {
        data: instructors,
        isLoading,
        refetch,
    } = useQuery({
        queryFn: GetInstructors,
        queryKey: ["instructors"],
    });

    const deleteInstructorMutation = useMutation({
        mutationFn: DeleteInstructor,
        mutationKey: ["instructors"],
        onSuccess: (res) => {
            if (res.status) {
                setInstructor(false);
                setAlert(res.message, "success");
                nav("/admin/instructor");
                refetch();
            } else {
                setAlert(res.message, "error");
            }
        },
        onError: () => {
            setAlert("Somthing Went Wrong", "error");
        },
    });

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const toEdit = (instructor) => {
        setInstructor(instructor);
        nav("edit");
    };

    if (isLoading) return <div>Loading ...</div>;

    return (
        <>
            <TableContainer
                className="c-white-child"
                component={Paper}
                sx={{
                    mt: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                    background: "transparent",
                    width: "100%",
                    overflowX: "auto",
                }}
            >
                <Typography variant="h6" sx={{ p: 2 }}>
                    Instructors
                </Typography>

                <Table>
                    <TableHead sx={{ backgroundColor: "primary.main" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white" }}>Name</TableCell>
                            <TableCell sx={{ color: "white" }}>Email</TableCell>
                            <TableCell sx={{ color: "white" }}>Phone</TableCell>
                            <TableCell sx={{ color: "white" }}>
                                Company name
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>price</TableCell>
                            <TableCell sx={{ color: "white" }}>
                                experience years
                            </TableCell>
                            <TableCell sx={{ color: "white" }} align="right">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {!instructors ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    No courses found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            instructors.map((instructor) => (
                                <TableRow
                                    key={instructor.id}
                                    hover
                                    onClick={() => {
                                        toEdit(instructor);
                                    }}
                                >
                                    <TableCell>
                                        {instructor.first_name +
                                            " " +
                                            instructor.last_name}
                                    </TableCell>
                                    <TableCell>{instructor.email}</TableCell>
                                    <TableCell
                                        sx={{
                                            maxWidth: 250,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {instructor.phone || "—"}
                                    </TableCell>
                                    <TableCell>
                                        {instructor.instructor.company_name}
                                    </TableCell>
                                    <TableCell>
                                        {instructor.instructor.price}
                                    </TableCell>
                                    <TableCell>
                                        {instructor.instructor.experience_years}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Link to="edit">
                                            <IconButton color="primary">
                                                <Edit />
                                            </IconButton>
                                        </Link>
                                        <IconButton
                                            color="error"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setInstructorId(
                                                    instructor.instructor.id
                                                );
                                                handleOpen();
                                            }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
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
                                deleteInstructorMutation.mutate(instructorId);
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
