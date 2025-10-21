import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return (
        <AppBar
            sx={{
                borderRadius: "var(--radius)",
                backgroundColor: "var(--color-gray-900)",
                overflow: "hidden",
            }}
            position="static"
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" onClick={() => navigate("/")}>
                    {" "}
                    TeachCode
                </Typography>
                <Nav />
            </Toolbar>
        </AppBar>
    );
}
