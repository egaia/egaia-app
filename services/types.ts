import {User} from "../models/User";

export type UserContextType = {
    user: User | undefined,
    setUser: Function
}

export enum WasteType {
    HouseholdWaste,
    Plastic,
    Glass,
    Metal,
    Cardboard,
    Paper
}
