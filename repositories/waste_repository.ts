import {endpointUrl} from "./api";
import axios from "axios";
import {Waste} from "../models/Waste";

const baseUrl: string = `${endpointUrl}/wastes`

export const allWastes = async (): Promise<Waste[] | string> => {
    return await axios.get(baseUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then(response => {
        const data: WastesApiResponse = response.data

        if (data.success && data.wastes) {
            return data.wastes
        } else {
            return data.message
        }
    }).catch(error => {
        console.error(error)
        return error.message
    })
}

export const findWaste = async (id: number): Promise<Waste | string> => {
    return await axios.get(`${baseUrl}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then(response => {
        const data: WasteApiResponse = response.data

        if (data.success && data.waste) {
            return data.waste
        } else {
            return data.message
        }
    }).catch(error => {
        console.error(error)
        return error.message
    })
}

type WastesApiResponse = {
    success: boolean,
    wastes?: Waste[],
    message?: string
}

type WasteApiResponse = {
    success: boolean,
    waste?: Waste,
    message?: string
}
