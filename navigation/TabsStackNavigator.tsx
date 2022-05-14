import {Colors} from "../services/constants";
import GoodPlansScreen from "../screens/GoodPlansScreen";
import {Image, View} from "react-native";
import CollectPointsScreen from "../screens/CollectPointsScreen";
import SearchScreen from "../screens/SearchScreen";
import ChallengesScreen from "../screens/ChallengesScreen";
import AccountScreen from "../screens/AccountScreen";
import React, {useContext} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SearchStackNavigator from "./SearchStackNavigator";
import {UserContextType} from "../services/types";
import {UserContext} from "../contexts/user";
import LoginScreen from "../screens/authentication/LoginScreen";

const TabsStack = createBottomTabNavigator();

const TabsStackNavigator = () => {

    const { user } = useContext<UserContextType>(UserContext)

    return (
        <TabsStack.Navigator
            screenOptions={{
                //tabBarShowLabel: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.secondary,
            }}
            initialRouteName="SearchTab"
        >
            <TabsStack.Screen
                name="GoodPlans"
                component={GoodPlansScreen}
                options={{
                    title: "Bons plans",
                    tabBarLabelStyle: {textTransform: 'uppercase'},
                    tabBarIcon: ({color, size}) => (
                        <View>
                            <Image
                                source={require('../assets/icons/etiqueter.png')}
                                resizeMode='contain'
                                style={{
                                    width: size,
                                    tintColor: color,
                                }}/>
                        </View>
                    )
                }}
            />
            <TabsStack.Screen
                name="CollectPoints"
                component={CollectPointsScreen}
                options={{
                    title: "Points de collecte",
                    tabBarLabelStyle: {textTransform: 'uppercase'},
                    tabBarLabel: 'Collecte',
                    tabBarIcon: ({color, size}) => (
                        <View>
                            <Image
                                source={require('../assets/icons/marqueur.png')}
                                resizeMode='contain'
                                style={{
                                    width: size,
                                    tintColor: color,
                                }}/>
                        </View>
                    )
                }}
            />
            <TabsStack.Screen
                name="SearchTab"
                component={SearchStackNavigator}
                options={{
                    headerShown: false,
                    title: "Rechercher",
                    tabBarLabelStyle: {textTransform: 'uppercase'},
                    tabBarIcon: ({color, size}) => (
                        <View>
                            <Image
                                source={require('../assets/icons/rechercher.png')}
                                resizeMode='contain'
                                style={{
                                    width: size,
                                    tintColor: color,
                                }}/>
                        </View>
                    )
                }}
            />
            <TabsStack.Screen
                name="Challenges"
                component={ChallengesScreen}
                options={{
                    title: "Défis",
                    tabBarLabelStyle: {textTransform: 'uppercase'},
                    tabBarIcon: ({color, size}) => (
                        <View>
                            <Image
                                source={require('../assets/icons/flamme.png')}
                                resizeMode='contain'
                                style={{
                                    width: size,
                                    tintColor: color,
                                }}/>
                        </View>
                    )
                }}
            />
            <TabsStack.Screen
                name="Profile"
                component={user !== undefined ? AccountScreen : LoginScreen}
                options={{
                    headerShown: false,
                    title: "Profil",
                    tabBarLabelStyle: {textTransform: 'uppercase'},
                    tabBarIcon: ({color, size}) => (
                        <View>
                            <Image
                                source={require('../assets/icons/utilisateur.png')}
                                resizeMode='contain'
                                style={{
                                    width: size,
                                    tintColor: color,
                                }}/>
                        </View>
                    )
                }}
            />
        </TabsStack.Navigator>
    );
}

export default TabsStackNavigator
