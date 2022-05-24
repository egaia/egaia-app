import axios from "axios";
import {endpointUrl} from "./api";
import {Promotion} from "../models/Promotion";

const baseUrl: string = `${endpointUrl}/promotions`

export const getAllPromotions = async (token: string): Promise<Promotion[]> => {
    return await axios.get(baseUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        return response.data.promotions
    }).catch(error => {
        console.error(error.message)
        return error.message
    })
}

export const findPromotion = async (id: number, token: string): Promise<Promotion> => {
    return await axios.get(`${baseUrl}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        return response.data.promotion
    }).catch(error => {
        console.error(error.message)
        return error.message
    })
}
