import {endpointUrl} from "./api";
import {User} from "../models/User";
import axios, {AxiosResponse} from "axios";
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

export const getAllChallenges = async (token: string): Promise<AllChallengesApiResponse|string> => {
    return await axios.get(baseUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then((response: AxiosResponse) => {
        const data: AllChallengesApiResponse = response.data
        if(data.success) return data
    }).catch(error => {
        console.error(error)
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

export type AllChallengesApiResponse = {
    success: boolean,
    currentChallenge?: Challenge,
    challenges: {
        date_month: string,
        carbon_date: string,
        results: Challenge[]
    }[]
}
