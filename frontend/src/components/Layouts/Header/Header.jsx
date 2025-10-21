import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Nav from "./Nav";
import Cursor from "../Cursor";

export default function Header() {
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
                <Typography variant="h6">TeachCode</Typography>
                <Nav />
            </Toolbar>
            <Cursor />
        </AppBar>
    );
}
