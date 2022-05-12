import {UserDTO} from "../models/DTO/UserDTO";
import axios from "axios";
import {User} from "../models/User";
import {endpointUrl} from "./api";

const baseUrl = `${endpointUrl}/auth`

export const registerUser = async (userDTO: UserDTO): Promise<User | string> => {
    return await axios.post(`${baseUrl}/register`, userDTO, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then(response => {
        const data: AuthApiResponse = response.data

        if (data.success && data.user) {
            return data.user
        } else {
            return data.message
        }

    }).catch(error => {
        console.error(error)
        return error.message
    })
}

export const loginUser = async (email: string, password: string): Promise<User | string> => {
    return await axios.post(`${baseUrl}/login`, {
            email,
            password
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(response => {
        const data: AuthApiResponse = response.data

        if (data.success && data.user) {
            return data.user
        } else {
            return data.message
        }

    }).catch(error => {
        console.error(error)
        return error.message
    })
}

export const getByApiToken = async (token: string): Promise<User | string> => {
    return await axios.get(`${baseUrl}/user`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }).then(response => {
        const data: AuthApiResponse = response.data
        if (data.success && data.user) {
            return data.user
        } else {
            return data.message
        }
    }).catch(error => {
        console.error(error)
        return error.message
    })
}

type AuthApiResponse = {
    success: boolean,
    user?: User,
    message?: string
}
