import {TrashCan} from "./TrashCan";
import {WasteType} from "../services/types";

export interface WastePart {
    id: number,
    name: string,
    type: WasteType,
    trashCan: TrashCan
}
