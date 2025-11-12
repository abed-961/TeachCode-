import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Divider,
    Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import { CourseContext } from "../../services/Contexts/CourseContext";
import { useNavigate } from "react-router-dom";
import { photoUrl } from "../../env/axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CourseDetails() {
    const nav = useNavigate();
    const { course } = useContext(CourseContext);
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        if (!course) {
            nav("/");
        }
    }, [nav, course]);

    const handleJoin = () => {
        // Call backend API here to join the course
        setJoined(true);
    };

    // Normalize outcomes to always be an array of strings
    const normalizedOutcomes = course?.outcomes
        ? course.outcomes.map((o) =>
              typeof o === "string" ? o : o.description
          )
        : [];

    return (
        <>
            {course && (
                <Card
                    sx={{
                        maxWidth: 800,
                        mx: "auto",
                        mt: 4,
                        p: 3,
                        borderRadius: 3,
                        boxShadow: 4,
                        background: "var(--bg-card)",
                    }}
                    className="c-white-child"
                >
                    {/* Course Image */}
                    {course.photo && (
                        <CardMedia
                            component="img"
                            image={photoUrl + course.photo}
                            alt={course.name}
                            sx={{
                                borderRadius: 2,
                                mb: 3,
                                maxHeight : "400px",
                                objectFit: "cover",
                            }}
                        />
                    )}

                    <CardContent>
                        {/* Course Title */}
                        <Typography variant="h4" fontWeight={700} gutterBottom>
                            {course.name}
                        </Typography>

                        {/* Instructor + Duration */}
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <Chip
                                icon={<SchoolIcon />}
                                label={`Instructor: ${
                                    course.instructor?.user?.first_name || "N/A"
                                }`}
                            />
                            <Chip
                                label={`Duration: ${course.duration_weeks} weeks`}
                                color="primary"
                                variant="outlined"
                            />
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* Description */}
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            mb={3}
                        >
                            <h5 style={{ display: "inline" }}>
                                {" "}
                                description :{" "}
                            </h5>
                            {course.description}
                        </Typography>

                        {/* What you'll learn */}
                        {normalizedOutcomes.length > 0 && (
                            <>
                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                    mb={1}
                                >
                                    What you’ll learn:
                                </Typography>
                                <ul
                                    style={{
                                        marginLeft: "20px",
                                        marginBottom: "24px",
                                    }}
                                >
                                    {normalizedOutcomes.map((item, index) => (
                                        <li key={index}>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {item}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {/* Join button */}
                        <Box textAlign="center" mt={3}>
                            {joined ? (
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="large"
                                    startIcon={<CheckCircleIcon />}
                                    disabled
                                >
                                    Joined
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="large"
                                    onClick={handleJoin}
                                >
                                    Join This Course
                                </Button>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            )}
        </>
    );
}
