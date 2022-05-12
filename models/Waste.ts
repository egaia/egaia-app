import {WasteCategory} from "./WasteCategory";
import {WastePart} from "./WastePart";

export interface Waste {
    id: number,
    name: string,
    image: string,
    category: WasteCategory,
    parts?: WastePart[]
}
