import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { photoUrl } from "../../../env/axios";
import { Delete } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import { UserCourseContext } from "../../../services/Contexts/UserCourseContext";

export default function UserComponent({ user, setOpen, setUserId }) {
    const { setUserCourse } = React.useContext(UserCourseContext);
    const nav = useNavigate();
    const fullName = user.first_name + " _ " + user.last_name;
    return (
        <Card
            sx={{ maxWidth: 300, height: "max-content", padding: "10px" }}
            className="bg-main "
        >
            <CardActionArea>
                <CardMedia
                    sx={{ objectFit: "contain" }}
                    component="img"
                    height="140"
                    image={photoUrl + user.photo}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className="c-white"
                    >
                        {fullName}
                    </Typography>
                    <Typography variant="body2" className="c-white">
                        email : {user.email}
                    </Typography>
                    {user.bio && (
                        <Typography variant="body2" className="c-white">
                            Bio : {user.bio}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
            <CardActions
                sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
                <Button
                    size="small"
                    className="btn"
                    onClick={() => {
                        setUserCourse(user);
                        nav("user");
                    }}
                >
                    <RemoveRedEyeIcon className="c-white" />
                </Button>
                <Button
                    size="small"
                    className="btn"
                    onClick={() => {
                        setUserId(user.id);
                        setOpen(true);
                    }}
                >
                    <Delete sx={{ color: "red", fontSize: 28 }} />
                </Button>
            </CardActions>
        </Card>
    );
}
