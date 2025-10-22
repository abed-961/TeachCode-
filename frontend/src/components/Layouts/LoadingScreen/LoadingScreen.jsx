import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingScreenPage({ message = "Loading..." }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100%",
                color: "white",
                gap: 2,
            }}
        >
            <CircularProgress
                size={60}
                thickness={5}
                sx={{
                    color: "purple",
                }}
            />
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {message}
            </Typography>
        </Box>
    );
}
