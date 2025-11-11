import { createContext, useState } from "react";

const UserCourseContext = createContext();
const UP = UserCourseContext.Provider;

export default function UserCourseProvider({ children }) {
    const [userCourse, setUserCourse] = useState(null);
    return <UP value={{ userCourse, setUserCourse }}>{children} </UP>;
}

export { UserCourseContext };
