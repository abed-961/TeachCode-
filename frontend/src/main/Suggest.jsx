import React, { useContext } from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    Chip,
} from "@mui/material";
import { UserContext } from "../services/Contexts/userContext";
import { Link } from "react-router-dom";

export default function Suggest() {
    const { user } = useContext(UserContext);
    const cards = [
        {
            title: "Mentor Feedback",
            desc: "Weekly code reviews and one-on-one mentorship to sharpen your skills.",
            tag: "Support",
        },
        {
            title: "Hands-on Projects",
            desc: "Real products to ship — portfolio pieces you can show employers.",
            tag: "Practice",
        },
        {
            title: "Career Prep",
            desc: "Interview training, resume help, and tech hiring guidance.",
            tag: "Career",
        },
        {
            title: "Community",
            desc: "Active study groups and community challenges to keep momentum.",
            tag: "Network",
        },
        {
            title: "Flexible Schedules",
            desc: "Self-paced content + scheduled live sessions for accountability.",
            tag: "Flexible",
        },
        {
            title: "Affordable Plans",
            desc: "Student discounts, scholarships, and pay-as-you-learn options.",
            tag: "Pricing",
        },
    ];

    return (
        <Container sx={{ py: 8 }}>
            <Typography variant="h3">Some Advantages</Typography>
            <Grid mt={4} className="some-cards">
                {cards.map((card) => (
                    <Grid sm={6} md={4} key={card.title}>
                        <Box whileHover={{ y: -4 }}>
                            <Card
                                elevation={2}
                                sx={{ borderRadius: 3 }}
                                className="card bg-main-card"
                            >
                                <CardContent>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight={600}
                                        >
                                            {card.title}
                                        </Typography>
                                        <Chip
                                            label={card.tag}
                                            size="small"
                                            sx={{ color: "var(--muted)" }}
                                        />
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        mt={1}
                                    >
                                        {card.desc}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {!user && (
                <Box
                    mt={8}
                    p={4}
                    borderRadius={3}
                    sx={{ backgroundColor: "primary.main", color: "white" }}
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    <Box>
                        <Typography variant="h6" fontWeight={600}>
                            Ready to start building?
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            Join our upcoming cohort or try a free mini-project.
                        </Typography>
                    </Box>
                    <Box display="flex" gap={2}>
                        <Link to="register">
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ bgcolor: "white", color: "primary.main" }}
                            >
                                Sign up
                            </Button>
                        </Link>
                        <Button
                            variant="outlined"
                            color="inherit"
                            sx={{ borderColor: "white", color: "white" }}
                        >
                            Pricing
                        </Button>
                    </Box>
                </Box>
            )}
        </Container>
    );
}
