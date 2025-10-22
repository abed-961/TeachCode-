import { Box, Container } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./MainLayout.css";
import Sidebar from "../SideBar/SideBar";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../services/UserServices";
import LoadingScreenPage from "../LoadingScreen/LoadingScreen";

export default function MainLayout() {
    const navigate = useNavigate();
    const { isLoading, isError } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    });

    if (isLoading) return <LoadingScreenPage />;
    if (isError) {
        navigate("/");
    }
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
