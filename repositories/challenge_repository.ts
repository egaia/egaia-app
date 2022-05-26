import {endpointUrl} from "./api";
import {User} from "../models/User";
import axios, {AxiosResponse} from "axios";
import {Challenge} from "../models/Challenge";
import {ChallengeParticipationDTO} from "../models/DTO/ChallengeParticipationDTO";
import {Platform} from "react-native";

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

export const participateToChallenge = async (challengeParticipationDTO: ChallengeParticipationDTO, token: string): Promise<ParticipateChallengeApiResponse|string> => {

    let uriParts = challengeParticipationDTO.picture.uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('challenge_id', challengeParticipationDTO.challenge_id.toString())
    formData.append('picture', {
        uri: challengeParticipationDTO.picture.uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
    });

    return await axios.post(`${baseUrl}/participate`, formData, {
        headers: {
            'Content-type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then((response: AxiosResponse) => {
        const data: ParticipateChallengeApiResponse = response.data
        if(data.success) return data
    }).catch(error => {
        console.error(error.body)
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

export type ParticipateChallengeApiResponse = {
    success: boolean
}
