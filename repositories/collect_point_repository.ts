import {endpointUrl} from "./api";
import axios from "axios";
import {CollectPoint} from "../models/CollectPoint";

const baseUrl = `${endpointUrl}/collect-points`

export const getAllCollectPoints = async (latitude: number, longitude: number): Promise<CollectPoint[]|string> => {
    return await axios.get(`${baseUrl}?latitude=${latitude}&longitude=${longitude}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then(response => {
        const data: CollectPointApiResponse = response.data

        if(data.success && data.collectPoints) {
            return data.collectPoints
        } else {
            return data.message
        }

    }).catch(error => {
        console.error(error.message)
        return error.message
    })
}

type CollectPointApiResponse = {
    success: boolean,
    collectPoints?: CollectPoint[],
    message?: string
}
