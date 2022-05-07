import {User} from "../../models/User";
import {UserActionType, LOGIN, LOGOUT} from "../actions/user.actions";

const UserReducer = (state: User | null = null, action: UserActionType) => {
    switch (action.type) {
        case LOGIN:
            return action.payload ?? null
        case LOGOUT:
            return null
        default:
            return state
    }
}

export default UserReducer
