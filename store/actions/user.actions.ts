import {User} from "../../models/User";

export interface UserActionType {
    type: String,
    payload: User | undefined
}

export const SAVE_USER = 'SAVE_USER'
export const saveUser = (user: User) => ({
    type: SAVE_USER,
    payload: user
})

export const DELETE_STORE_USER = 'LOGOUT'
export const deleteStoreUser = () => ({type: DELETE_STORE_USER})
