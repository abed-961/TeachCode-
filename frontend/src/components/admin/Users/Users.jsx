import * as React from "react";
import { Box, Grid, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import ApplyUserToCourse from "./userInformations/ApplyUserToCourse";

export default function Users() {
    const [open, setOpen] = React.useState();
    return (
        <>
            <Box className="h-100 admin_pages">
                <Grid container className=" h-100 admin-grid-container">
                    <Grid item>
                        <Link to="/admin/Users">
                            <Button
                                sx={{ color: "white" }}
                                className=" h-100 btn"
                            >
                                View Users
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Button
                            sx={{ color: "white" }}
                            className=" h-100 btn"
                            onClick={() => setOpen(true)}
                        >
                            Apply course User
                        </Button>
                    </Grid>
                </Grid>
                <Outlet />
            </Box>
            <ApplyUserToCourse value={{ open, setOpen }} />
        </>
    );
}
