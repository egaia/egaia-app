import {Colors} from "../services/constants";
import GoodPlansScreen from "../screens/GoodPlansScreen";
import {Image, View} from "react-native";
import CollectPointsScreen from "../screens/CollectPointsScreen";
import ChallengesScreen from "../screens/ChallengesScreen";
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SearchStackNavigator from "./SearchStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";

const TabsStack = createBottomTabNavigator();

const TabsStackNavigator = () => {

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
                                    height: size,
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
                    headerShown: false,
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
                                    height: size,
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
                                    height: size,
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
                                    height: size,
                                    tintColor: color,
                                }}/>
                        </View>
                    )
                }}
            />
            <TabsStack.Screen
                name="Profile"
                component={ProfileStackNavigator}
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
                                    height: size,
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
