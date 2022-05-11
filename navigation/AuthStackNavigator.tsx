import LoginScreen from "../screens/authentication/LoginScreen";
import RegisterScreen from "../screens/authentication/RegisterScreen";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <AuthStack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        </AuthStack.Navigator>
    );
}

export default AuthStackNavigator
