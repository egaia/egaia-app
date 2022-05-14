import {createContext} from "react";
import {LoaderContextType} from "../services/types";

export const LoaderContext = createContext<LoaderContextType>({
    loading: false,
    setLoading: () => {}
})
