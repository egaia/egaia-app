import {Image, StyleSheet, View} from "react-native";
import {useContext, useEffect} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getByApiToken} from "../repositories/auth_repository";
import {Colors} from "../services/constants";
import {UserContextType} from "../services/types";
import {UserContext} from "../contexts/user";

export default function SplashScreen({navigation}: NativeStackScreenProps<any>) {

    const {setUser} = useContext<UserContextType>(UserContext)

    useEffect(() => {
        window.setTimeout(() => {
            AsyncStorage.getItem('api_token').then(value => {
                if (value) {
                    getByApiToken(value).then(user => {
                        if (user) {
                            AsyncStorage.setItem('api_token', user.apiToken).then(() => {
                                setUser(user)
                                navigation.replace("Tabs")
                            }).catch()
                        } else {
                            AsyncStorage.removeItem('api_token').then()
                        }
                    }).catch()
                } else {
                    navigation.replace("Landing")
                }
            }).catch(error => {
                navigation.replace("Landing")
            })
        }, 1000)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/img/logo-egaia.png")}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background
    },

    logoContainer: {
        height: '80%',
        width: '100%',
        justifyContent: "center",
        alignItems: "center"
    },

    logo: {
        width: 200,
        height: 200,
        tintColor: Colors.white
    },
})
