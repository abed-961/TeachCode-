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
import { CourseContext } from "../../../services/Contexts/CourseContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DeleteCourse, GetCourses } from "../../../services/CoursesService";

export default function CoursesView({ setAlert }) {
    const { setCourse } = useContext(CourseContext);
    const [open, setOpen] = useState(false);
    const [courseId, setCourseId] = useState();

    const nav = useNavigate();
    const { data: courses, refetch } = useQuery({
        queryKey: ["courses"],
        queryFn: GetCourses,
    });

    const deleteCourseMutation = useMutation({
        mutationFn: DeleteCourse,
        mutationKey: ["courses"],
        onSuccess: (res) => {
            if (res.status) {
                setAlert(res.message, "success");
                refetch();
            } else {
                setAlert("Something Went Wrong!", "error");
            }
        },
        onError: () => {
            setAlert("Somthing Went Wrong!", "error");
        },
    });
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const toEdit = (course) => {
        setCourse(course);
        nav("edit");
    };

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
                    Courses
                </Typography>

                <Table>
                    <TableHead sx={{ backgroundColor: "primary.main" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white" }}>ID</TableCell>
                            <TableCell sx={{ color: "white" }}>Name</TableCell>
                            <TableCell sx={{ color: "white" }}>
                                Description
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                                instructor
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                                Teaching Hours
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                                Duration (Weeks)
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                                Created At
                            </TableCell>
                            <TableCell sx={{ color: "white" }} align="right">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {!courses ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    No courses found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            courses.map((course) => (
                                <TableRow
                                    key={course.id}
                                    hover
                                    onClick={() => toEdit(course)}
                                >
                                    <TableCell
                                        onClick={() => {
                                            toEdit(course);
                                        }}
                                    >
                                        {course.id}
                                    </TableCell>
                                    <TableCell
                                        onClick={() => {
                                            toEdit(course);
                                        }}
                                    >
                                        {course.name}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            maxWidth: 250,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {course.description || "—"}
                                    </TableCell>
                                    <TableCell
                                        onClick={() => {
                                            toEdit(course);
                                        }}
                                    >
                                        {course.instructor.user.first_name +
                                            " _ " +
                                            course.instructor.user.last_name}
                                    </TableCell>
                                    <TableCell
                                        onClick={() => {
                                            toEdit(course);
                                        }}
                                    >
                                        {course.teaching_hours}
                                    </TableCell>
                                    <TableCell
                                        onClick={() => {
                                            toEdit(course);
                                        }}
                                    >
                                        {course.duration_weeks}
                                    </TableCell>
                                    <TableCell
                                        onClick={() => {
                                            toEdit(course);
                                        }}
                                    >
                                        {new Date(
                                            course.created_at
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Link to="edit">
                                            <IconButton color="primary">
                                                <Edit />
                                            </IconButton>
                                        </Link>
                                        <IconButton
                                            color="error"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setCourseId(course.id);
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
                                deleteCourseMutation.mutate(courseId);
                                handleClose();
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
