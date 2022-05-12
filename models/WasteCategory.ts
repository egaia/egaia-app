import {Waste} from "./Waste";

export interface WasteCategory {
    id: number,
    name: string,
    image: string,
    wastes?: Waste[]
}
