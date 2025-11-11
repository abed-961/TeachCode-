import React, { useState } from "react";
import {
    Modal,
    Card,
    CardContent,
    Typography,
    Autocomplete,
    TextField,
    Button,
    Stack,
    Box,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AllUser } from "../../../../services/UserServices";
import { GetCourses } from "../../../../services/CoursesService";
import { AddUserToCourse } from "../../../../services/AdminServices";

export default function ApplyUserToCourse({ user, setUser, value, setAlert }) {
    const { open, setOpen } = value;

    const [selectedUser, setSelectedUser] = useState(user || null);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const { data: users } = useQuery({
        queryKey: ["users"],
        queryFn: AllUser,
    });
    const { data: courses } = useQuery({
        queryKey: ["courses"],
        queryFn: GetCourses,
    });

    const AddUserToCourseMutation = useMutation({
        mutationFn: AddUserToCourse,
        onSuccess: (res) => {
            if (res.status) {
                setAlert(res.message, "success");
            } else {
                setAlert(res.message, "error");
            }
        },
        onError: () => setAlert("Something Went Wrong", "error"),
    });

    const handleApply = () => {
        if (selectedUser && selectedCourse) {
            AddUserToCourseMutation.mutate({
                course_id: selectedCourse.course_id,
                user_id: selectedUser.id,
            });
            setOpen(false);
        } else {
            alert("Please select both a user and a course.");
        }
    };

    return (
        <Modal
            open={open}
            onClose={() => {
                setOpen(false);
                setSelectedCourse(null);
                setSelectedUser(null);
                setUser(null);
            }}
            aria-labelledby="apply-user-course-modal"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(4px)",
            }}
        >
            <Card
                className=" c-white-child"
                sx={{
                    width: 500,
                    borderRadius: 3,
                    boxShadow: 6,
                    p: 1,
                    backgroundColor: "var(--color-gray-950)",
                }}
            >
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Apply User to Course
                    </Typography>

                    <Stack spacing={3} mt={2}>
                        {/* User selection */}
                        <Autocomplete
                            value={
                                selectedUser ? selectedUser : user ? user : ""
                            }
                            onChange={(event, newValue) =>
                                setSelectedUser(newValue)
                            }
                            options={users}
                            getOptionLabel={(option) =>
                                option
                                    ? `name : ${option.first_name} _ ${option.last_name}  ( ${option.email} )`
                                    : ""
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select User"
                                    variant="outlined"
                                />
                            )}
                            renderOption={(props, option) => (
                                <Box component="li" {...props}>
                                    <Typography>
                                        {" "}
                                        name :{" "}
                                        {option.first_name +
                                            " " +
                                            option.last_name}{" "}
                                    </Typography>

                                    <Typography variant="body2">
                                        ({option.email})
                                    </Typography>
                                </Box>
                            )}
                        />

                        {/* Course selection */}
                        <Autocomplete
                            options={courses}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search course"
                                    variant="outlined"
                                />
                            )}
                            onChange={(event, value) => {
                                setSelectedCourse({ course_id: value.id });
                            }}
                            renderOption={(props, option) => (
                                <Box component="li" {...props}>
                                    <Typography fontWeight="bold">
                                        {option.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Instructor:{" "}
                                        {option.instructor?.user.first_name ??
                                            "N/A"}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {" .  "} Hours: {option.teaching_hours}{" "}
                                        |{"  ."} Duration:{" "}
                                        {option.duration_weeks} weeks
                                    </Typography>
                                </Box>
                            )}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ textTransform: "none", fontWeight: "bold" }}
                            onClick={handleApply}
                        >
                            Apply User to Course
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Modal>
    );
}
