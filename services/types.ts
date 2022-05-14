/*export type TabsParamList = {
    GoodPlans: undefined,
    CollectPoints: undefined,
    Search: undefined,
    Challenges: undefined,
    Profile: undefined,
    AuthStackNavigator: AuthParamList,
}

export type AuthParamList = {
    Register: undefined,
    Login: undefined,
}

export type RootParamList = {
    Splash: undefined,
    Landing: undefined,
    Tabs: TabsParamList,
    Auth: AuthParamList
}*/

import {User} from "../models/User";

export type UserContextType = {
    user: User|undefined,
    setUser: Function
}

export type LoaderContextType = {
    loading: boolean,
    setLoading: Function
}
