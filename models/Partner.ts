import {Promotion} from "./Promotion";

export type Partner = {
    id: number,
    name: string,
    description?: string,
    image: string,
    website?: string,
    facebook?: string,
    instagram?: string,
    promotions?: Promotion[]
}
