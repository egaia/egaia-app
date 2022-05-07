import {configureStore} from "@reduxjs/toolkit";
import UserReducer from "./reducers/user.reducer";


export const store = configureStore({
    reducer: UserReducer
})
