import React from "react";
import { Box, Grid, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function Instructor() {
    return (
        <>
            <Box className="h-100 admin_pages">
                <Grid container className=" h-100 admin-grid-container">
                    <Grid item>
                        <Link to="/admin/instructor">
                            <Button
                                sx={{ color: "white" }}
                                className=" h-100 btn"
                            >
                                View Instructors
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="form">
                            <Button
                                sx={{ color: "white" }}
                                className=" h-100 btn"
                            >
                                Add new Instructor
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Outlet />
            </Box>
        </>
    );
}
