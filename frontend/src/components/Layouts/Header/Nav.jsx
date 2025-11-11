import { Box, Grid } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../../../services/Contexts/userContext";
import LoadingScreenPage from "../LoadingScreen/LoadingScreen";
//icons
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
export default function Nav() {
    const { user, isLoading } = useContext(UserContext);

    if (isLoading) return <LoadingScreenPage />;

    return (
        <>
            <Grid container spacing={2} className="nav-links">
                {!user ? (
                    <Box
                        sx={{ display: "flex" }}
                        spacing={{ xs: 2, sm: 3, md: 5 }}
                    >
                        <Grid className="btn">
                            <Link to="signin">Log In</Link>
                        </Grid>
                        <Grid className="btn">
                            <Link to="register">Register</Link>
                        </Grid>
                    </Box>
                ) : (
                    <Grid
                        container
                        sx={{ display: "flex" }}
                        spacing={{ xs: 2, sm: 3, md: 5 }}
                    >
                        <Grid className="btn">
                            <Link to="/">
                                <HomeIcon className="c-white" />
                            </Link>
                        </Grid>
                        <Grid className="btn">
                            <Link to="admin/page">
                                <AdminPanelSettingsIcon className="c-icon" />
                            </Link>
                        </Grid>
                        <Grid className="btn">
                            <Link to="profile/view">
                                <PersonOutlineIcon className="c-white" />
                            </Link>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </>
    );
}
