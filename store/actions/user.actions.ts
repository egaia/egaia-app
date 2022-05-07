import {User} from "../../models/User";

export interface UserActionType {
    type: String,
    payload: User|undefined
}

export const LOGIN = 'LOGIN'
export const login = (user: User) => ({
    type: LOGIN,
    payload: user
})

export const LOGOUT = 'LOGOUT'
export const logout = () => ({type: LOGOUT})
