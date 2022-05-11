import {Button, Text, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import EgaiaContainer from "../components/EgaiaContainer";
import {Colors} from "../services/constants";

export default function LandingScreen(props: NativeStackScreenProps<any>) {

    const goToLogin = () => {
        props.navigation.navigate("Auth", "Login")
    }

    const goToRegister = () => {
        props.navigation.navigate("Auth", "Register")
    }

    const goToHomeWithoutAccount = () => {
        props.navigation.navigate("Tabs", "GoodPlans")
    }

    return (
        <EgaiaContainer backgroundColor={Colors.primary}>
            <Text style={{textAlign: 'center'}}>EGAIA</Text>
            <View style={{backgroundColor: '#ffffff'}}>
                <Button title="SE CONNECTER" onPress={goToLogin}/>
                <Button title="S'INSCRIRE" onPress={goToRegister}/>
                <Text onPress={goToHomeWithoutAccount}>Continuer sans créer de compte</Text>
            </View>
        </EgaiaContainer>
    );
}
