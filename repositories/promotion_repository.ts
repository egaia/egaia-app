import axios from "axios";
import {displaySnackBarErrors, endpointUrl} from "./api";
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
        displaySnackBarErrors(error.response.data)
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
        displaySnackBarErrors(error.response.data)
    })
}

export const usePromotion = async (promotion: Promotion, token: string): Promise<boolean> => {
    return await axios.post(baseUrl, {
        promotion_id: promotion.id
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        return response.data.success
    }).catch(error => {
        displaySnackBarErrors(error.response.data)
    })
}
