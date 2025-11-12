import * as React from "react";
import VdSection from "./VdSection";
import { Box } from "@mui/material";
import Suggest from "./Suggest";
import CoursesComponent from "./CoursesComponent";
import CourseProvider from "../services/Contexts/CourseContext";

export default function Main_Component() {
    return (
        <Box className="main" component="ul" sx={{ p: 2 }}>
            <VdSection />
            <Suggest />
            <CoursesComponent />
        </Box>
    );
}
