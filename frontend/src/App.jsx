import "./App.css";
import { Routes, Route } from "react-router-dom";
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
import NotFound from "./components/NotFount.jsx";
import ProfileSetting from "./components/Forms/edit/EditProfile.jsx";

import { UserProvider } from "./services/Contexts/userContext.jsx";
import { useQuery } from "@tanstack/react-query";
import { GetUser } from "./services/UserServices.jsx";
import LoadingScreenPage from "./components/Layouts/LoadingScreen/LoadingScreen.jsx";
import ProfileView from "./components/Forms/edit/ProfileView.jsx";
import Main_Component from "./main/Main_Component.jsx";

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

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["user"],
        queryFn: GetUser,
        staleTime: 1000 * 60 * 5,
    });
    const [user, setUser] = useState();

    useEffect(() => {
        setUser(data);
    }, [data]);

    const sendAlert = (message, type) => {
        setAlert({
            message: message,
            type: type,
        });
    };
    if (isLoading) return <LoadingScreenPage />;
    else
        return (
            <>
                <UserProvider value={{ user, setUser, isLoading, refetch }}>
                    <Box sx={{ width: "100%", overflow: "hidden" }}>
                        <Image src={Blur1} className="svg" />
                        <Image src={Blur1} className="svg" />
                        <Image src={Background} className="svg" />
                        <Image src={Blur1} className="svg" />
                        <Routes>
                            <Route path="/" element={<MainLayout />}>
                                <Route index element={<Main_Component />} />
                                <Route
                                    path="profile/setting"
                                    element={
                                        <ProfileSetting
                                            setAlert={(message, type) =>
                                                sendAlert(message, type)
                                            }
                                        />
                                    }
                                />
                                <Route
                                    path="profile/view"
                                    element={
                                        <ProfileView
                                            setAlert={(message, type) => {
                                                sendAlert(message, type);
                                            }}
                                        />
                                    }
                                />
                            </Route>
                            {/* login component */}
                            <Route
                                path="signin"
                                element={
                                    <SignIn
                                        setAlert={(message, type) => {
                                            sendAlert(message, type);
                                        }}
                                    />
                                }
                            />
                            {/* register component */}
                            <Route
                                path="register"
                                element={
                                    <Register
                                        setAlert={(message, type) =>
                                            sendAlert(message, type)
                                        }
                                    />
                                }
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>

                        <Cursor />
                        {alert.message && (
                            <Alert
                                severity={alert.type}
                                className="alertMessage"
                            >
                                {alert.message}
                            </Alert>
                        )}
                    </Box>
                </UserProvider>
            </>
        );
}

export default App;
