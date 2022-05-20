import {UserDTO} from "../models/DTO/UserDTO";
import axios, {AxiosError, AxiosResponse} from "axios";
import {User} from "../models/User";
import {endpointUrl} from "./api";
import {useContext} from "react";
import {UserContext} from "../contexts/user";
import {UserContextType} from "../services/types";

const baseUrl: string = `${endpointUrl}/auth`

export const registerUser = async (userDTO: UserDTO): Promise<User | string> => {
    return await axios.post(`${baseUrl}/register`, userDTO, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then((response: AxiosResponse) => {
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
        }).then((response: AxiosResponse) => {
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
    }).then((response: AxiosResponse) => {
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

export const checkPassword = async (password: string, token: string): Promise<AuthApiResponse> => {
    return await axios.get(`${baseUrl}/check-password`, {
        params: {
            password
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }).then((response: AxiosResponse) => {
        return response.data
    }).catch((error: AxiosError) => {
        console.error(error.message)
    })
}

export const updateUser = async (data: UpdateUserData, token: string): Promise<User | string> => {
    return await axios.put(`${baseUrl}/update`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }).then((response: AxiosResponse) => {
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

export type UpdateUserData = {
    firstname: string|null,
    lastname: string|null,
    birthdate: string|null,
    email: string|null,
    password: string|null
}
