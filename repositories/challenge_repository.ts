import {displaySnackBarErrors, endpointUrl} from "./api";
import axios, {AxiosResponse} from "axios";
import {Challenge} from "../models/Challenge";
import {ChallengeParticipationDTO} from "../models/DTO/ChallengeParticipationDTO";

const baseUrl: string = `${endpointUrl}/challenges`

export const getAllChallenges = async (token: string): Promise<AllChallengesApiResponse> => {
    return await axios.get(baseUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then((response: AxiosResponse) => {
        return response.data
    }).catch(error => {
        displaySnackBarErrors(error.response.data)
    })
}

export const participateToChallenge = async (challengeParticipationDTO: ChallengeParticipationDTO, token: string): Promise<ParticipateChallengeApiResponse> => {

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
        return response.data
    }).catch(error => {
        displaySnackBarErrors(error.response.data)
    })
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
