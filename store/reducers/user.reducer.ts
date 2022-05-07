import {User} from "../../models/User";
import {LOGIN, LOGOUT} from "../actions/user.actions";

interface ActionType {
    type: typeof LOGIN | typeof LOGOUT
}

const UserReducer = (state: User|null = null, action: ActionType) => {
    switch (action.type) {
        case LOGIN: return {name: 'Guitou', apiToken: 'abcdef' }
        case LOGOUT: return null
        default: return state
    }
}

export default UserReducer
