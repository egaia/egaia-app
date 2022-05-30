import {WasteType} from "../services/types";

export type CollectPoint = {
    id: number,
    name: string,
    address: string,
    latitude: number,
    longitude: number,
    type: WasteType,
    custom: number
}
