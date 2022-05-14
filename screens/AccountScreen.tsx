import {Button, StyleSheet, Text, View} from 'react-native';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import EgaiaContainer from "../components/EgaiaContainer";
import {deleteUserInLocalStorage} from "../services/local_storage";
import {UserContext} from "../contexts/user";
import {useContext} from "react";
import {UserContextType} from "../services/types";

export default function AccountScreen({navigation}: NativeStackScreenProps<any>) {

    const { user, setUser } = useContext<UserContextType>(UserContext)

    const loginMyUser = () => {
        navigation.navigate("Auth", "Login")
    }

    const logoutMyUser = () => {
        deleteUserInLocalStorage().then(() => {
            setUser(undefined)
        })
    }

    return (
        <EgaiaContainer>
            <View style={styles.container}>
                <Text style={styles.title}>Profil</Text>
                {user !== undefined ? <Text>Bonjour {user.firstname} !</Text> : null}
                {user !== undefined ? <Button title="Déconnexion" onPress={() => logoutMyUser()}/>
                    : <Button title="Connexion" onPress={() => loginMyUser()}/>
                }
            </View>
        </EgaiaContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
