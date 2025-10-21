import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout/MainLayout.jsx";
import { Box } from "@mui/material";
import Cursor from "./components/Layouts/Cursor.jsx";
import SignIn from "./components/Forms/SignIn/SignIn.jsx";

//images
import Blur1 from "../public/images/blurred-shape.svg";
import Background from "../public/images/svgviewer-output.svg";
import Image from "./components/Layouts/Image.jsx";

function App() {
    return (
        <>
            <Box sx={{ width: "100%", overflow: "hidden" }}>
                <Image src={Blur1} className="svg" />
                <Image src={Blur1} className="svg" />
                <Image src={Background} className="svg" />
                <Router>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<div>Home Page</div>} />

                            <Route
                                path="signup"
                                element={<div>Sign Up Page</div>}
                            />
                        </Route>
                        <Route path="signin" element={<SignIn />} />
                        <Route path="*" element={<div>404 Not Found</div>} />
                    </Routes>
                </Router>
            </Box>
        </>
    );
}

export default App;
