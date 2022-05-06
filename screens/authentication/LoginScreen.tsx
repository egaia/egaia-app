import {Text, TextInput} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AuthParamList} from "../../services/types";

export default function LoginScreen({navigation}: NativeStackScreenProps<AuthParamList, "Login">) {
    return (
        <SafeAreaView>
            <Text>Connexion</Text>
            <TextInput placeholder="Email"/>
            <TextInput placeholder="Mot de passe"/>
        </SafeAreaView>
    )
}
