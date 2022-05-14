import {endpointUrl} from "./api";
import {User} from "../models/User";
import axios from "axios";
import {Challenge} from "../models/Challenge";

const baseUrl: string = `${endpointUrl}/challenges`

export const getChallengesByUser = async (user: User): Promise<Challenge[]|string> => {
    return await axios.get(`${baseUrl}/user`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${user.apiToken}`
        }
    }).then(response => {
        const data: ChallengesApiResponse = response.data

        if (data.success && data.challenges) {
            return data.challenges
        } else {
            return data.message
        }
    }).catch(error => {
        console.error(error.message)
        return error.message
    })
}

type ChallengesApiResponse = {
    success: boolean,
    challenges?: Challenge[],
    message?: string
}

type ChallengeApiResponse = {
    success: boolean,
    challenge?: Challenge,
    message?: string
}
