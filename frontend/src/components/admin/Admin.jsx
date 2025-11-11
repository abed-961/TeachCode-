import { Button } from "@mui/joy";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "./admin.css";

export default function Admin_page() {
    return (
        <>
            <Box className="h-100">
                <Grid container className=" h-100 admin-grid-container">
                    <Grid item>
                        <Link to="/admin/courses">
                            <Button className=" h-100 btn">courses</Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/admin/instructor">
                            <Button className=" h-100 btn">Instructors</Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/admin/users">
                            <Button className=" h-100 btn">ْUsers</Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Button className=" h-100 btn">Hello</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
