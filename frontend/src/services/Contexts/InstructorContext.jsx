import { createContext, useState } from "react";

const InstructorContext = createContext();

export default function InstructorProvider({ children }) {
    const [instructor, setInstructor] = useState();
    return (
        <InstructorContext.Provider
            value={{
                instructor,
                setInstructor,
            }}
        >
            {children}
        </InstructorContext.Provider>
    );
}

export { InstructorContext };
