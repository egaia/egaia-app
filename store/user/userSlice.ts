import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            name: ''
        }
    },
    reducers: {
        getUser: state => {
            state.user = {
                name: 'Guitou'
            }
        },
        removeUser: state => {
            state.user = {
                name: ''
            }
        },
    }
})

// Action creators are generated for each case reducer function
export const { getUser, removeUser } = userSlice.actions

export const userReducer = userSlice.reducer
