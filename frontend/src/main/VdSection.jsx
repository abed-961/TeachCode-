import * as React from "react";
import { CardCover, Card, Box } from "@mui/joy";
import { Divider } from "@mui/material";

import "./main.css";

export default function VdSection() {
    return (
        <Box component="ul" className="vd-grid">
            <Card
                className="h-100"
                component="li"
                sx={{
                    minWidth: 300,
                    backgroundColor: "var(--color-gray-950)",
                    p: 0,
                }}
            >
                <CardCover>
                    <video
                        autoPlay
                        loop
                        muted
                        poster="/images/mainVideo.mp4"
                        style={{ objectFit: "contain", opacity: 0.8 }}
                    >
                        <source src="/images/mainVideo.mp4" type="video/mp4" />
                    </video>
                </CardCover>
            </Card>
            <Card
                component="li"
                sx={{
                    minWidth: 300,
                    backgroundColor: "var(--color-gray-950)",
                    color: "white",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 2,
                        fontSize: "1rem",
                        fontWeight: 600,
                    }}
                >
                    We don’t just teach coding — we build confident
                    problem-solvers ready to take on real-world challenges.
                </Box>
            </Card>
        </Box>
    );
}
