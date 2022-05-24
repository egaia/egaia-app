import {Partner} from "./Partner";

export type Promotion = {
    id: number,
    label: string,
    description: string,
    cost: number,
    number_of_uses: number,
    number_of_uses_remaining: number,
    partner?: Partner
}
