import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout/MainLayout.jsx";
import { Alert, Box } from "@mui/material";
import Cursor from "./components/Layouts/Cursor.jsx";
import SignIn from "./components/Forms/SignIn/SignIn.jsx";

//images
import Blur1 from "../public/images/blurred-shape.svg";
import Background from "../public/images/svgviewer-output.svg";
import Image from "./components/Layouts/Image.jsx";
import { useEffect, useState } from "react";
import Register from "./components/Forms/SignIn/Register.jsx";
import NotFount from "./components/NotFount.jsx";

function App() {
    const [alert, setAlert] = useState({ message: null, type: null });

    useEffect(() => {
        if (alert.message) {
            const timer = setTimeout(() => {
                setAlert({ message: null, type: null });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <>
            <Box sx={{ width: "100%", overflow: "hidden" }}>
                <Image src={Blur1} className="svg" />
                <Image src={Blur1} className="svg" />
                <Image src={Background} className="svg" />
                <Image src={Blur1} className="svg" />
                <Router>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<div>Home Page</div>} />
                        </Route>
                        {/* login component */}
                        <Route
                            path="signin"
                            element={
                                <SignIn
                                    setAlert={(message, type) => {
                                        setAlert({
                                            message: message,
                                            type: type,
                                        });
                                    }}
                                />
                            }
                        />
                        {/* register component */}
                        <Route
                            path="register"
                            element={
                                <Register
                                    setAlert={(message, type) => {
                                        setAlert({
                                            message: message,
                                            type: type,
                                        });
                                    }}
                                />
                            }
                        />
                        <Route path="*" element={<NotFount />} />
                    </Routes>
                </Router>
                <Cursor />
                {alert.message && (
                    <Alert severity={alert.type} className="alertMessage">
                        {alert.message}
                    </Alert>
                )}
            </Box>
        </>
    );
}

export default App;
