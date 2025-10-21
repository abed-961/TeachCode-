import { Box, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                mt: "auto",
                color: "var(--surface)",
            }}
        >
            &copy; 2025 TeachCode. All rights reserved.
        </Box>
    );
}
