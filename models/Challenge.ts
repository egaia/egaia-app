export interface Challenge {
    id: number,
    title: string,
    content: string,
    points: number,
    startedAt: Date,
    endedAt: Date,
    participation?: {
        picture: string,
        valid: boolean
    }
}
