import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./user/userSlice";


export const store = configureStore({
    reducer: {
        userProvider: userReducer
    }
})

export interface UserProviderState {
    userProvider: {
        user: {
            name: String
        }
    }
}
