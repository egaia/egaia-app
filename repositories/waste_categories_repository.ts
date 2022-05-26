import {displaySnackBarErrors, endpointUrl} from "./api";
import axios from "axios";
import {WasteCategory} from "../models/WasteCategory";

const baseUrl = `${endpointUrl}/waste-categories`

export const allWasteCategories = async (): Promise<WasteCategory[]> => {
    return await axios.get(baseUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then(response => {
        return response.data.categories
    }).catch(error => {
        displaySnackBarErrors(error.response.data)
    })
}

export const findWasteCategory = async (id: number): Promise<WasteCategory> => {
    return await axios.get(`${baseUrl}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then(response => {
        return response.data.category
    }).catch(error => {
        displaySnackBarErrors(error.response.data)
    })
}
