import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <>
            <Grid container spacing={2} className="nav-links">
                <Grid className="btn" item>
                    <Link to="signin">Log In</Link>
                </Grid>
                <Grid item className="btn">
                    <Link to="by">Home</Link>
                </Grid>
                <Grid item className="btn">
                    <Link to="ok">Home</Link>
                </Grid>
            </Grid>
        </>
    );
}
