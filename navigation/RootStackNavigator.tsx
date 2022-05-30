import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import LandingScreen from "../screens/LandingScreen";
import EgaiaHeaderBackButton from "../components/EgaiaHeaderBackButton";
import TabsStackNavigator from "./TabsStackNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import {NavigationContainer} from "@react-navigation/native";
import {Colors} from "../services/constants";

const RootStack = createNativeStackNavigator();

const RootStackNavigator = () => {
    return (

        <RootStack.Navigator>
            <RootStack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
            <RootStack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
            <RootStack.Screen name="Tabs" component={TabsStackNavigator} options={{headerShown: false}}/>
            <RootStack.Screen
                name="Auth"
                component={AuthStackNavigator}
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerBackTitleVisible: false,
                    headerTintColor: Colors.primary
                }}
            />
        </RootStack.Navigator>
    );
}

export default RootStackNavigator;
