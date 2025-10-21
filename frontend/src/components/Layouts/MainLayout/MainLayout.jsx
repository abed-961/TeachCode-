import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./MainLayout.css";
import Sidebar from "../SideBar/SideBar";



export default function MainLayout() {
    return (
        <>
        
            <Box className="main-grid">
                <Box className="header">
                    <Header />
                </Box>
                <Box className="sidebar">
                    <Sidebar />
                </Box>

                <Box className="content">
                    <Outlet />
                </Box>

                <Box className="footer">
                    <Footer />
                </Box>
            </Box>
        </>
    );
}
