import {displaySnackBarErrors, endpointUrl} from "./api";
import axios from "axios";
import {Waste} from "../models/Waste";

const baseUrl: string = `${endpointUrl}/wastes`

export const allWastes = async (): Promise<Waste[]> => {
    return await axios.get(baseUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then(response => {
        return response.data.wastes
    }).catch(error => {
        displaySnackBarErrors(error.response.data)
    })
}

export const findWaste = async (id: number): Promise<Waste> => {
    return await axios.get(`${baseUrl}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then(response => {
        return response.data.waste
    }).catch(error => {
        displaySnackBarErrors(error.response.data)
    })
}
