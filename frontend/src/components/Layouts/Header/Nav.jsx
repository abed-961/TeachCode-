import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Nav() {
    const [user, setUser] = useState();

    const navigate = useNavigate();
    useEffect(() => {
        setUser(Cookies.get("user"));
    }, [navigate]);
    return (
        <>
            <Grid container spacing={2} className="nav-links">
                {!user && (
                    <Box sx={{ display: "flex", gap: 5 }}>
                        <Grid className="btn" item>
                            <Link to="signin">Log In</Link>
                        </Grid>
                        <Grid item className="btn">
                            <Link to="register">Register</Link>
                        </Grid>
                    </Box>
                )}

                {user && (
                    <Box sx={{ display: "flex", gap: 5 }}>
                        <Grid className="btn" item>
                            <Link to="profile/setting">Setting</Link>
                        </Grid>
                        <Grid item className="btn">
                            <Link to="register">Info</Link>
                        </Grid>
                    </Box>
                )}
            </Grid>
        </>
    );
}
