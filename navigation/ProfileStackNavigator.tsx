import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AccountScreen from "../screens/profile/AccountScreen";
import UpdateProfileScreen from "../screens/profile/UpdateProfileScreen";
import React, {useContext} from "react";
import {UserContextType} from "../services/types";
import {UserContext} from "../contexts/user";
import AuthStackNavigator from "./AuthStackNavigator";
import EgaiaHeaderBackButton from "../components/EgaiaHeaderBackButton";

const ProfileStack = createNativeStackNavigator()

const ProfileStackNavigator = () => {

    const { user } = useContext<UserContextType>(UserContext)

    return (
        <ProfileStack.Navigator>
            {user !== undefined && <ProfileStack.Screen name="Account" component={AccountScreen} options={{headerShown: false}} />}
            {user !== undefined && <ProfileStack.Screen name="UpdateProfile" component={UpdateProfileScreen} options={(props) => {
                const {navigation} = props;
                return ({
                    headerTitle: '',
                    headerTransparent: true,
                    headerLeft: () => (
                        <EgaiaHeaderBackButton navigation={navigation}/>
                    ),
                    gestureEnabled: false,
                })
            }} />}
            {user === undefined && <ProfileStack.Screen name="Auth" component={AuthStackNavigator} options={{headerShown: false}} />}
        </ProfileStack.Navigator>
    )
}

export default ProfileStackNavigator
