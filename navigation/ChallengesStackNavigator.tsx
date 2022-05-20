import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ChallengesScreen from "../screens/challenges/ChallengesScreen";
import ChallengeScreen from "../screens/challenges/ChallengeScreen";
import EgaiaHeaderBackButton from "../components/EgaiaHeaderBackButton";
import React from "react";
import CameraScreen from "../screens/challenges/CameraScreen";

const ChallengesStack = createNativeStackNavigator()

const ChallengesStackNavigator = () => {
    return (
        <ChallengesStack.Navigator initialRouteName="Challenges">
            <ChallengesStack.Screen name="Challenges" component={ChallengesScreen} options={{headerShown: false}} />
            <ChallengesStack.Screen
                name="Challenge"
                component={ChallengeScreen}
                options={(props) => {
                    const {navigation} = props;
                    return ({
                        headerTitle: '',
                        headerTransparent: true,
                        headerLeft: () => (
                            <EgaiaHeaderBackButton navigation={navigation}/>
                        ),
                        gestureEnabled: false,
                    })
                }}
            />
            <ChallengesStack.Screen name="Camera" component={CameraScreen} options={{headerShown: false}} />
        </ChallengesStack.Navigator>
    )
}

export default ChallengesStackNavigator
