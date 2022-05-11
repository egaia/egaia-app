import {UserDTO} from "../models/DTO/UserDTO";
import axios from "axios";
import {User} from "../models/User";

const baseUrl = 'http://egaia-manager.test/api/auth'

export const register = async (userDTO: UserDTO): Promise<User | string> => {
    return await axios.post(`${baseUrl}/register`, userDTO, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then(response => {
        const data: AuthApiResponse = response.data

        if (data.success && data.user) {
            const {user} = data
            return {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                birthdate: user.birthdate,
                email: user.email,
                points: user.points,
                apiToken: user.api_token,
            }
        } else {
            return data.message
        }

    }).catch(error => {
        console.error(error)
        return error.message
    })
}

export const login = async (email: string, password: string): Promise<User | string> => {
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
            const {user} = data
            return {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                birthdate: user.birthdate,
                email: user.email,
                points: user.points,
                apiToken: user.api_token,
            }
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
            const {user} = data
            return {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                birthdate: user.birthdate,
                email: user.email,
                points: user.points,
                apiToken: user.api_token,
            }
        } else {
            return data.message
        }
    }).catch(error => {
        console.error(error)
        return error.message
    })
}

export type AuthApiResponse = {
    success: boolean,
    user?: {
        id: number,
        firstname: string,
        lastname: string,
        birthdate: string,
        email: string,
        points: number,
        api_token: string
    },
    message?: string
}
