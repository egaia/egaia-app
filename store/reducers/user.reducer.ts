import {User} from "../../models/User";
import {UserActionType, SAVE_USER, DELETE_STORE_USER} from "../actions/user.actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserReducer = (state: User | null = null, action: UserActionType) => {
    switch (action.type) {
        case SAVE_USER:
            return action.payload ?? null
        case DELETE_STORE_USER:
            return null
        default:
            return state
    }
}

export default UserReducer

export const saveUserInLocalStorage = async (token: string): Promise<void> => {
    await AsyncStorage.setItem('api_token', token)
}

export const deleteUserInLocalStorage = async (): Promise<void> => {
    await AsyncStorage.removeItem('api_token')
}
