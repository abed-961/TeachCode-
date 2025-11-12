import React from "react";
import { Box, Grid, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function Courses() {
    return (
        <>
            <Box className="h-100 admin_pages" sx={{ p : 4}}>
                <Grid container className=" h-100 admin-grid-container">
                    <Grid item>
                        <Link to="/admin/courses">
                            <Button
                                sx={{ color: "white" }}
                                className=" h-100 btn"
                            >
                                View courses
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="form">
                            <Button
                                sx={{ color: "white" }}
                                className=" h-100 btn"
                            >
                                Insert new Course
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Outlet />
            </Box>
        </>
    );
}
