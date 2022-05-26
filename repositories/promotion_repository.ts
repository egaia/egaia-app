import axios from "axios";
import {endpointUrl} from "./api";
import {Promotion} from "../models/Promotion";

const baseUrl: string = `${endpointUrl}/promotions`

export const getAllPromotions = async (token: string|undefined): Promise<Promotion[]> => {
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

export const findPromotion = async (id: number, token: string|undefined): Promise<Promotion> => {
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

export const usePromotion = async (promotion: Promotion, token: string): Promise<boolean|string> => {
    return await axios.post(baseUrl, {
        promotion_id: promotion.id
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        return true
    }).catch(error => {
        console.error(error.message)
        return error.message
    })
}
