export interface Challenge {
    id: number,
    title: string,
    points: number,
    startedAt: Date,
    endedAt: Date,
    participation?: {
        picture: string,
        valid: boolean
    }
}
