import {Text, TextInput} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AuthParamList} from "../../services/types";

export default function RegisterScreen({navigation}: NativeStackScreenProps<AuthParamList, "Register">) {
    return (
        <SafeAreaView>
            <Text>Inscription</Text>
            <TextInput placeholder="Prénom" />
            <TextInput placeholder="Nom" />
            <TextInput placeholder="Date de naissance" />
            <TextInput placeholder="Email" />
            <TextInput placeholder="Mot de passe" />
            <TextInput placeholder="Confirmation Mot de passe" />
        </SafeAreaView>
    )
}
