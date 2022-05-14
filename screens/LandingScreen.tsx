import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import EgaiaContainer from "../components/EgaiaContainer";
import {Colors} from "../services/constants";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";

export default function LandingScreen(props: NativeStackScreenProps<any>) {

    const goToLogin = () => {
        props.navigation.navigate("Auth", {screen: "Login"})
    }

    const goToRegister = () => {
        props.navigation.navigate("Auth", {screen: "Register"})
    }

    const goToHomeWithoutAccount = () => {
        props.navigation.navigate("Tabs")
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/icons/flamme.png")}/>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        <SecondaryButton text="Se connecter" onPress={goToLogin} />
                    </View>
                    <View style={styles.button}>
                        <PrimaryButton text="Creer un compte" onPress={goToRegister}/>
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <TouchableOpacity onPress={goToHomeWithoutAccount}>
                        <Text>Continuer sans créer de compte</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: "space-between",
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
        height: 200
    },

    bottomContainer: {
        height: '20%',
        width: '100%',
        backgroundColor: Colors.white
    },

    buttonsContainer: {
        width: '100%',
        height: '70%',
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },

    button: {
        width: '50%',
        paddingHorizontal: 5
    },

    textContainer: {
        width: '100%',
        height: '30%',
        justifyContent: "flex-start",
        alignItems: "center"
    }
})
