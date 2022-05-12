import {endpointUrl} from "./api";
import axios from "axios";
import {WasteCategory} from "../models/WasteCategory";

const baseUrl = `${endpointUrl}/waste-categories`

export const allWasteCategories = async (): Promise<WasteCategory[] | string> => {
    return await axios.get(baseUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then(response => {
        const data: WasteCategoriesApiResponse = response.data

        if (data.success && data.categories) {
            return data.categories
        } else {
            return data.message
        }
    }).catch(error => {
        console.error(error)
        return error.message
    })
}

export const findWasteCategory = async (id: number): Promise<WasteCategory | string> => {
    return await axios.get(`${baseUrl}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then(response => {
        const data: WasteCategoryApiResponse = response.data

        if (data.success && data.category) {
            return data.category
        } else {
            return data.message
        }
    }).catch(error => {
        console.error(error)
        return error.message
    })
}

type WasteCategoriesApiResponse = {
    success: boolean,
    categories?: WasteCategory[],
    message?: string
}

type WasteCategoryApiResponse = {
    success: boolean,
    category?: WasteCategory,
    message?: string
}
