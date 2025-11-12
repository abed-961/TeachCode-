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
                    <Grid
                        container
                        sx={{ display: "flex" }}
                        spacing={{ xs: 2, sm: 3, md: 5 }}
                    >
                        <Link to="signin" className="btn">
                            Log In
                        </Link>

                        <Link to="register" className="btn">
                            Register
                        </Link>
                    </Grid>
                ) : (
                    <Grid
                        container
                        sx={{ display: "flex" }}
                        spacing={{ xs: 2, sm: 3, md: 5 }}
                    >
                        <Link to="/" className="btn">
                            <HomeIcon className="c-white" />
                        </Link>

                        <Link to="admin/page" className="btn">
                            <AdminPanelSettingsIcon className="c-icon" />
                        </Link>

                        <Link to="profile/view" className="btn">
                            <PersonOutlineIcon className="c-white" />
                        </Link>
                    </Grid>
                )}
            </Grid>
        </>
    );
}
