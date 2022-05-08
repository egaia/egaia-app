import {SafeAreaView} from "react-native-safe-area-context";
import {Button, Dimensions, Text} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootParamList} from "../services/types";
import {loginUser} from "../repositories/user_repository";
import {useDispatch} from "react-redux";
import {login} from "../store/actions/user.actions";
import EgaiaContainer from "../components/EgaiaContainer";

const windowHeight: number = Dimensions.get("window").height

export default function LandingScreen({navigation}: NativeStackScreenProps<RootParamList, "Splash">) {

    const dispatch = useDispatch()

    const goToRegister = () => {
        navigation.navigate({name: "Auth", key: "Register"});
    }

    const goToLogin = () => {
        navigation.navigate({name: "Auth", key: "Login"});
    }

    const goToHomeWithoutAccount = () => {
        navigation.navigate({name: "Tabs", key: "Search"})
    }

    const goToHomeWithAccount = () => {
        loginUser().then(function (user) {
            dispatch(login(user))
            navigation.navigate({name: "Tabs", key: "Search"})
        })
    }

    return (
        <EgaiaContainer style={{backgroundColor: 'green'}}>
            <Text style={{textAlign: 'center'}}>EGAIA</Text>
            <SafeAreaView style={{backgroundColor: '#ffffff'}}>
                <Button title="SE CONNECTER" onPress={goToLogin} />
                <Button title="S'INSCRIRE" onPress={goToRegister} />
                <Text onPress={goToHomeWithAccount}>Continuer avec un compte</Text>
                <Text onPress={goToHomeWithoutAccount}>Continuer sans créer de compte</Text>
            </SafeAreaView>
        </EgaiaContainer>
    );
}
