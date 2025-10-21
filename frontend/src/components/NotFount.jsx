import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFount() {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100vh",
            }}
        >
            <Box
                sx={{
                    width: 300,
                    height: 200,
                    padding: 5,
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    background: "var(--color-gray-900)",
                    borderRadius: "15px",
                }}
            >
                <p>..oops it's look like you seach about invalid route</p>
                <Link to="/" className="btn">
                    Back to Home
                </Link>
            </Box>
        </Box>
    );
}
