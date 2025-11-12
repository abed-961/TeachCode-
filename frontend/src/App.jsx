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

// admin
import Admin_page from "./components/admin/Admin.jsx";
//course
import Courses from "./components/admin/Courses/Courses.jsx";
import CoursesView from "./components/admin/Courses/CoursesView.jsx";
import CourseForm from "./components/admin/Courses/CourseForm.jsx";
import EditCourseForm from "./components/admin/Courses/EditCourse.jsx";
import CourseProvider from "./services/Contexts/CourseContext.jsx";
//instructor
import Instructor from "./components/admin/instructor/Instructor.jsx";
import Instructor_View from "./components/admin/instructor/InstructorView.jsx";
import InstructorForm from "./components/admin/instructor/InstructorForm.jsx";
import InstructorProvider from "./services/Contexts/InstructorContext.jsx";
import Instructor_Edit from "./components/admin/instructor/EditInstructor.jsx";
import Users from "./components/admin/Users/Users.jsx";
import UsersView from "./components/admin/Users/UsersView.jsx";
import UserInformations from "./components/admin/Users/userInformations/UserInformations.jsx";
import UserCourseProvider from "./services/Contexts/UserCourseContext.jsx";
import CourseDetails from "./components/user/CourseDetails.jsx";

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
                    <CourseProvider>
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

                                    <Route
                                        path="admin/page"
                                        element={<Admin_page />}
                                    />
                                    {/* Courses  */}
                                    <Route
                                        path="admin/courses"
                                        element={
                                            <CourseProvider>
                                                <Courses />
                                            </CourseProvider>
                                        }
                                    >
                                        <Route
                                            index
                                            element={
                                                <CoursesView
                                                    setAlert={(
                                                        message,
                                                        type
                                                    ) => {
                                                        sendAlert(
                                                            message,
                                                            type
                                                        );
                                                    }}
                                                />
                                            }
                                        />
                                        <Route
                                            path="form"
                                            element={
                                                <CourseForm
                                                    setAlert={(
                                                        message,
                                                        type
                                                    ) => {
                                                        sendAlert(
                                                            message,
                                                            type
                                                        );
                                                    }}
                                                />
                                            }
                                        />
                                        <Route
                                            path="edit"
                                            element={
                                                <EditCourseForm
                                                    setAlert={(
                                                        message,
                                                        type
                                                    ) => {
                                                        sendAlert(
                                                            message,
                                                            type
                                                        );
                                                    }}
                                                />
                                            }
                                        />
                                    </Route>
                                    {/* Instructors */}
                                    <Route
                                        path="admin/instructor"
                                        element={
                                            <InstructorProvider>
                                                <Instructor />
                                            </InstructorProvider>
                                        }
                                    >
                                        <Route
                                            index
                                            element={
                                                <Instructor_View
                                                    setAlert={(message, type) =>
                                                        sendAlert(message, type)
                                                    }
                                                />
                                            }
                                        />
                                        <Route
                                            path="form"
                                            element={
                                                <InstructorForm
                                                    setAlert={(message, type) =>
                                                        sendAlert(message, type)
                                                    }
                                                />
                                            }
                                        />
                                        <Route
                                            path="edit"
                                            element={
                                                <Instructor_Edit
                                                    setAlert={(message, type) =>
                                                        sendAlert(message, type)
                                                    }
                                                />
                                            }
                                        />
                                    </Route>
                                    {/* Users */}
                                    <Route
                                        path="admin/users"
                                        element={
                                            <UserCourseProvider>
                                                <Users />
                                            </UserCourseProvider>
                                        }
                                    >
                                        <Route index element={<UsersView />} />
                                        <Route
                                            path="user"
                                            element={
                                                <UserInformations
                                                    setAlert={(
                                                        message,
                                                        type
                                                    ) => {
                                                        sendAlert(
                                                            message,
                                                            type
                                                        );
                                                    }}
                                                />
                                            }
                                        />
                                    </Route>

                                    {/* User Routes */}
                                    <Route
                                        path="/course/details"
                                        element={<CourseDetails />}
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
                                    sx={{ minWidth: "200px" }}
                                    severity={alert.type}
                                    className="alertMessage"
                                >
                                    {alert.message}
                                </Alert>
                            )}
                        </Box>
                    </CourseProvider>
                </UserProvider>
            </>
        );
}

export default App;
