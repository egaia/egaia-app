import {displaySnackBarErrors, endpointUrl} from "./api";
import axios from "axios";
import {CollectPoint} from "../models/CollectPoint";

const baseUrl = `${endpointUrl}/collect-points`

export const getAllCollectPoints = async (latitude: number, longitude: number): Promise<CollectPoint[]> => {
    return await axios.get(`${baseUrl}?latitude=${latitude}&longitude=${longitude}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then(response => {
        return response.data.collectPoints
    }).catch(error => {
        displaySnackBarErrors(error.response.data)
    })
}
