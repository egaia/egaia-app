export interface User {
    id: number,
    firstname: string,
    lastname: string,
    birthdate: Date,
    image: string,
    email: string,
    points: number,
    apiToken: string,
    historic: UserHistoricItem[]
}

export type UserHistoricItem = {
    id: number,
    label: string,
    type: string,
    points: number,
    date: Date,
    valid: boolean
}
