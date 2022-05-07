import {User} from "../models/User";
import DefaultPreference from 'react-native-default-preference';

export async function loginUser(): Promise<User> {
    return await DefaultPreference.set('api_token', 'azerty').then(function (){
        return {
            name: 'UserTest',
            apiToken: 'azerty'
        }
    })
}

export async function logoutUser(): Promise<null> {
    return await DefaultPreference.clear('api_token').then(function (){
        return null
    })
}
