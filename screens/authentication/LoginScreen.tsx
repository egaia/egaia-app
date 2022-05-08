import {Text, TextInput} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AuthParamList} from "../../services/types";
import EgaiaContainer from "../../components/EgaiaContainer";

export default function LoginScreen({navigation}: NativeStackScreenProps<AuthParamList, "Login">) {
    return (
        <EgaiaContainer withAppBar={true}>
            <Text>Connexion</Text>
            <TextInput placeholder="Email"/>
            <TextInput placeholder="Mot de passe"/>
        </EgaiaContainer>
    )
}
