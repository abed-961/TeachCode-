import { useState, useEffect, useContext } from "react";
import { Card, Box } from "@mui/joy";

import "./main.css";
import { Button, CardContent, Chip, Grid, Typography } from "@mui/material";
import { UserContext } from "../services/Contexts/userContext";
import { Link } from "react-router-dom";

export default function VdSection() {
    const { user } = useContext(UserContext);
    const advantages = [
        "Hands-on projects & exercises",
        "Expert instructors with real experience",
        "Fast feedback and code reviews",
        "Career-focused curriculum",
        "Flexible self-paced learning",
    ];

    const [text, setText] = useState("");
    const [advIndex, setAdvIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(80);

    useEffect(() => {
        const fullText = advantages[advIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setText(fullText.slice(0, text.length + 1));
                if (text === fullText) setIsDeleting(true);
            } else {
                setText(fullText.slice(0, text.length - 1));
                if (text === "") {
                    setIsDeleting(false);
                    setAdvIndex((i) => (i + 1) % advantages.length);
                }
            }
        }, speed);
        return () => clearTimeout(timeout);
    }, [text, isDeleting, advIndex]);
    return (
        <Box
            component="ul"
            sx={{ p: 2 }}
            className="vd-grid bg-main-card rounded "
        >
            <Grid item xs={12} md={6}>
                <Typography variant="h3" fontWeight={700} gutterBottom>
                    Learn to Code — Build Real Projects
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Practical, mentor-led courses that get you from zero to
                    production. Join thousands of students building the next
                    generation of applications.
                </Typography>

                <Box display="flex" alignItems="center" gap={2} mt={3}>
                    <Chip
                        label="Why us"
                        sx={{ color: "var(--muted)" }}
                        variant="outlined"
                    />
                    <Typography variant="h6">
                        {text}
                        <Box
                            component="span"
                            sx={{ ml: 1, animation: "blink 1s infinite" }}
                        >
                            |
                        </Box>
                    </Typography>
                </Box>

                <Box m={4} display="flex" gap={2}>
                    <Button
                        variant="contained"
                        className="bg-main"
                        size="large"
                    >
                        View Courses
                    </Button>
                    {!user && (
                        <Link to="signin">
                            <Button
                                variant="outlined"
                                className="btn"
                                size="large"
                            >
                                Get Started
                            </Button>
                        </Link>
                    )}
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
                <Box
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card
                        elevation={4}
                        sx={{ borderRadius: 3, color: "white" }}
                        className="bg-main"
                    >
                        <CardContent>
                            <Typography variant="overline" className="c-white">
                                Featured Course
                            </Typography>
                            <Typography variant="h6" fontWeight={600}>
                                Full-stack Project Bootcamp
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "var(--muted)" }}
                                mt={1}
                            >
                                Build a SaaS product from scratch with mentor
                                guidance.
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
        </Box>
    );
}
