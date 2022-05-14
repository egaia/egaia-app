import {createContext} from "react";
import {UserContextType} from "../services/types";

export const UserContext = createContext<UserContextType>({
    user: undefined,
    setUser: () => {}
})
