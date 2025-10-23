import { createContext } from "react";

const UserContext = createContext();
const UserProvider = UserContext.Provider;

export { UserContext, UserProvider };
