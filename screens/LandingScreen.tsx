import {SafeAreaView} from "react-native-safe-area-context";
import {Button, Text} from "react-native";
import {useEffect} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootParamList} from "../services/types";
import {useSelector} from "react-redux";
import {User} from "../models/User";

export default function LandingScreen({navigation}: NativeStackScreenProps<RootParamList, "Splash">) {

    const user = useSelector((state: User|null) => state)

    useEffect(() => {
        console.log('user', user)
    }, [])

    const goToRegister = () => {
        navigation.navigate({name: "Auth", key: "Register"});
    }

    const goToLogin = () => {
        navigation.navigate({name: "Auth", key: "Login"});
    }

    const goToHome = () => {
        navigation.navigate({name: "Tabs", key: "Search"})
    }

    return (
        <SafeAreaView style={{backgroundColor: '#57b454', height: 1000}}>
            <Text style={{textAlign: 'center'}}>EGAIA</Text>
            <SafeAreaView style={{backgroundColor: '#ffffff'}}>
                <Button title="SE CONNECTER" onPress={goToLogin} />
                <Button title="S'INSCRIRE" onPress={goToRegister} />
                <Text onPress={goToHome}>Continuer sans créer de compte</Text>
            </SafeAreaView>
        </SafeAreaView>
    );
}
