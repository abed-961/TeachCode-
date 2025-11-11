import React, { useContext, useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Typography,
    Avatar,
    Divider,
    Button,
    Stack,
    Box,
    Chip,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { photoUrl } from "../../../../env/axios";
import { UserCourseContext } from "../../../../services/Contexts/UserCourseContext";
import { useNavigate } from "react-router-dom";
import LoadingScreenPage from "../../../Layouts/LoadingScreen/LoadingScreen";
import ApplyUserToCourse from "./ApplyUserToCourse";

export default function UserInformations({ setAlert }) {
    const { userCourse } = useContext(UserCourseContext);
    const [user, setUser] = useState();
    const [open, setOpen] = useState(false);

    const nav = useNavigate();
    useEffect(() => {
        if (!userCourse) nav(-1);
        setUser(userCourse);
    }, [userCourse, nav]);

    if (!user) return <LoadingScreenPage />;
    return (
        <>
            <Card
                sx={{
                    width: "70%",
                    minWidth: "300px",
                    borderRadius: 3,
                    boxShadow: 4,
                    margin: "10px auto",
                }}
                className="bg-main c-white-child border-white border-white-child"
            >
                <CardHeader
                    avatar={
                        <Avatar
                            src={photoUrl + user.photo}
                            alt={user.name}
                            sx={{ width: 64, height: 64 }}
                        />
                    }
                    title={<Typography variant="h6">{user.name}</Typography>}
                    subheader={user.email}
                />

                <CardMedia
                    component="img"
                    height="180"
                    image={photoUrl + user.photo}
                    alt={user.name}
                    sx={{ objectFit: "contain" }}
                />

                <CardContent>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        gutterBottom
                    >
                        {user.bio}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Stack spacing={1}>
                        <Typography variant="body2">
                            <strong>Phone:</strong> {user.phone}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Country:</strong> {user.country}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Region:</strong> {user.region}
                        </Typography>
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Applied Courses:
                        </Typography>
                        {user.appliedCourses?.length ? (
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                {user.appliedCourses.map((course, index) => (
                                    <Chip
                                        key={index}
                                        icon={<SchoolIcon />}
                                        label={course}
                                        color="primary"
                                        variant="outlined"
                                    />
                                ))}
                            </Stack>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                No courses applied yet.
                            </Typography>
                        )}
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            mt: 3,
                            textTransform: "none",
                            fontWeight: "bold",
                        }}
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        Apply to Course
                    </Button>
                </CardContent>
            </Card>
            <ApplyUserToCourse
                value={{ open, setOpen }}
                user={user}
                setUser={setUser}
                setAlert={(message, type) => {
                    setAlert(message, type);
                }}
            />
        </>
    );
}
