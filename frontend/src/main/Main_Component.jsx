import * as React from "react";
import VdSection from "./VdSection";
import { Box } from "@mui/material";

export default function Main_Component() {
    return (
        <Box
            className="main"
            component="ul"
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "100%",
                p: 0,
                m: 0,
            }}
        >
            <VdSection />
        </Box>
    );
}
