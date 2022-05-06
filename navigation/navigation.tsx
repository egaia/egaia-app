import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SearchScreen from "../screens/SearchScreen";
import GoodPlansScreen from "../screens/GoodPlansScreen";
import CollectPointsScreen from "../screens/CollectPointsScreen";
import ChallengesScreen from "../screens/ChallengesScreen";
import AccountScreen from "../screens/AccountScreen";
import {Image, StyleSheet, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {AuthParamList, TabsParamList} from "../services/types";
import LoginScreen from "../screens/authentication/LoginScreen";
import RegisterScreen from "../screens/authentication/RegisterScreen";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Colors} from "../services/constants";

const Tab = createBottomTabNavigator<TabsParamList>();
const AuthStack = createNativeStackNavigator<AuthParamList>();

const Navigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                //tabBarShowLabel: false,
                tabBarActiveTintColor: Colors.secondary,
                tabBarInactiveTintColor: Colors.primary,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    backgroundColor: '#efefef',
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow
                }
            }}
            initialRouteName="Search"
        >
            <Tab.Screen
                name="GoodPlans"
                component={GoodPlansScreen}
                options={{
                    title: "Bons plans",
                    tabBarLabelStyle: {textTransform: 'uppercase'},
                    tabBarIcon: ({focused, color, size}) => (
                        <SafeAreaView style={styles.view_icon}>
                            <Image
                                source={require('../assets/icons/etiqueter.png')}
                                resizeMode='contain'
                                style={{
                                    width: size,
                                    tintColor: color,
                                    marginBottom: 20
                                }}/>
                        </SafeAreaView>
                    )
                }}
            />
            <Tab.Screen
                name="CollectPoints"
                component={CollectPointsScreen}
                options={{
                    title: "Points de collecte",
                    tabBarLabelStyle: {textTransform: 'uppercase'},
                    tabBarLabel: 'Collecte',
                    tabBarIcon: ({focused, color, size}) => (
                        <SafeAreaView style={styles.view_icon}>
                            <Image
                                source={require('../assets/icons/marqueur.png')}
                                resizeMode='contain'
                                style={{
                                    width: size,
                                    tintColor: color,
                                    marginBottom: 20
                                }}/>
                        </SafeAreaView>
                    )
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    title: "Rechercher",
                    tabBarLabelStyle: {textTransform: 'uppercase'},
                    tabBarIcon: ({focused, color, size}) => (
                        <SafeAreaView style={styles.view_icon}>
                            <Image
                                source={require('../assets/icons/rechercher.png')}
                                resizeMode='contain'
                                style={{
                                    width: size,
                                    tintColor: color,
                                    marginBottom: 20
                                }}/>
                        </SafeAreaView>
                    )
                }}
            />
            <Tab.Screen
                name="Challenges"
                component={ChallengesScreen}
                options={{
                    title: "Défis",
                    tabBarLabelStyle: {textTransform: 'uppercase'},
                    tabBarIcon: ({focused, color, size}) => (
                        <SafeAreaView style={styles.view_icon}>
                            <Image
                                source={require('../assets/icons/flamme.png')}
                                resizeMode='contain'
                                style={{
                                    width: size,
                                    tintColor: color,
                                    marginBottom: 20
                                }}/>
                        </SafeAreaView>
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={AccountScreen}
                options={{
                    title: "Profil",
                    tabBarLabelStyle: {textTransform: 'uppercase'},
                    tabBarIcon: ({focused, color, size}) => (
                        <SafeAreaView style={styles.view_icon}>
                            <Image
                                source={require('../assets/icons/utilisateur.png')}
                                resizeMode='contain'
                                style={{
                                    width: size,
                                    tintColor: color,
                                    marginBottom: 20
                                }}/>
                        </SafeAreaView>
                    )
                }}
            />
            {/*<Tab.Screen name="AuthStackNavigator" component={AuthStackNavigator} options={{ headerShown: false}} />*/}
        </Tab.Navigator>
    );
}

const AuthStackNavigator = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={LoginScreen} options={{title: 'Connexion'}} />
            <AuthStack.Screen name="Register" component={RegisterScreen} options={{title: 'Inscription'}} />
        </AuthStack.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    view_icon: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 10
    },
})

export default Navigation;
