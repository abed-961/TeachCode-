import React, { useContext } from "react";

import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    CircularProgress,
} from "@mui/material";
import { photoUrl } from "../env/axios";
import { useQuery } from "@tanstack/react-query";
import { GetCourses } from "../services/CoursesService";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../services/Contexts/CourseContext";

export default function CoursesComponent() {
    const { setCourse } = useContext(CourseContext);
    const nav = useNavigate();
    const { data: courses, isLoading } = useQuery({
        queryKey: ["courses"],
        queryFn: GetCourses,
    });

    // const courses = [
    //     {
    //         id: 1,
    //         title: "Full-Stack Web Development",
    //         description:
    //             "Learn to build complete web applications using Laravel, React, and MySQL. Includes hands-on projects and deployment tutorials.",
    //         image_url: photoUrl + "/photos/default-photo.jpg",
    //     },
    //     {
    //         id: 2,
    //         title: "JavaScript Mastery",
    //         description:
    //             "Master modern JavaScript from basics to advanced ES6+ concepts. Perfect for aspiring front-end developers.",
    //         image_url: photoUrl + "/photos/default-photo.jpg",
    //     },
    //     {
    //         id: 3,
    //         title: "Python for Data Science",
    //         description:
    //             "A beginner-friendly guide to using Python for data analysis, visualization, and machine learning.",
    //         image_url: photoUrl + "/photos/default-photo.jpg",
    //     },
    //     {
    //         id: 4,
    //         title: "UI/UX Design Fundamentals",
    //         description:
    //             "Learn how to design beautiful, user-friendly interfaces and create engaging user experiences with Figma.",
    //         image_url: photoUrl + "/photos/default-photo.jpg",
    //     },
    //     {
    //         id: 5,
    //         title: "React + TypeScript Crash Course",
    //         description:
    //             "Get productive with React and TypeScript. Understand type safety, props, hooks, and component structure.",
    //         image_url: photoUrl + "/photos/default-photo.jpg",
    //     },
    //     {
    //         id: 6,
    //         title: "DevOps and CI/CD Pipelines",
    //         description:
    //             "Understand the DevOps lifecycle, build CI/CD pipelines using GitHub Actions, Docker, and AWS.",
    //         image_url: photoUrl + "/photos/default-photo.jpg",
    //     },
    // ];

    if (isLoading) {
        return (
            <Grid container justifyContent="center" sx={{ mt: 5 }}>
                <CircularProgress />
            </Grid>
        );
    }

    return (
        <>
            <Typography variant="h4">Some of Our Courses</Typography>
            <Grid
                sx={{
                    p: { xs: 2, md: 4 },
                    overflowX: "scroll ",
                }}
                className="d-flex flex-row  gap-3 overflow-x-scroll m-0 remove-scroll"
            >
                {courses.map((course) => (
                    <Grid
                        item
                        key={course.id}
                        sx={{ width: "250px", flexShrink: 0 }}
                    >
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: 3,
                                boxShadow: 3,
                                transition: "transform 0.2s ease",
                                "&:hover": { transform: "scale(1.03)" },
                            }}
                            className="bg-main-card"
                        >
                            <CardMedia
                                component="img"
                                height="180"
                                image={
                                    photoUrl + course.photo ||
                                    "https://via.placeholder.com/300x180?text=Course+Image"
                                }
                                alt={course.name}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {course.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 2 }}
                                >
                                    {course.description?.slice(0, 100)}...
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ borderRadius: 2 }}
                                    className="bg-dark text-light"
                                    onClick={() => {
                                        console.log(course);
                                        setCourse(course);
                                        nav("/course/details");
                                    }}
                                >
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
