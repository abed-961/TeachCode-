import { Box, Grid } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../../../services/Contexts/userContext";
import LoadingScreenPage from "../LoadingScreen/LoadingScreen";

export default function Nav() {
    const { user, isLoading } = useContext(UserContext);

    if (isLoading) return <LoadingScreenPage />;

    return (
        <>
            <Grid container spacing={2} className="nav-links">
                {!user ? (
                    <Box sx={{ display: "flex", gap: 5 }}>
                        <Grid className="btn">
                            <Link to="signin">Log In</Link>
                        </Grid>
                        <Grid className="btn">
                            <Link to="register">Register</Link>
                        </Grid>
                    </Box>
                ) : (
                    <Grid container sx={{ display: "flex", gap: 5 }}>
                        <Grid className="btn">
                            <Link to="profile/view">Profile</Link>
                        </Grid>
                        <Grid className="btn">
                            <Link to="register">Info</Link>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </>
    );
}
