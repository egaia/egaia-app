import {TrashCan} from "./TrashCan";

export interface WastePart {
    id: number,
    name: string,
    type: number,
    trashCan: TrashCan
}
