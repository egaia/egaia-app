import {CameraCapturedPicture} from "expo-camera";

export interface ChallengeParticipationDTO {
    challenge_id: number,
    picture: CameraCapturedPicture
}
