import {Button, StyleSheet, Text, View} from 'react-native';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useDispatch, useSelector} from "react-redux";
import {User} from "../models/User";
import {deleteStoreUser} from "../store/actions/user.actions";
import EgaiaContainer from "../components/EgaiaContainer";
import {deleteUserInLocalStorage} from "../store/reducers/user.reducer";

export default function AccountScreen({navigation}: NativeStackScreenProps<any>) {

    const user = useSelector((state: User | null) => state)
    const dispatch = useDispatch()

    const loginMyUser = () => {
        navigation.navigate("Auth", "Login")
    }

    const logoutMyUser = () => {
        deleteUserInLocalStorage().then(() => {
            dispatch(deleteStoreUser())
        })
    }

    return (
        <EgaiaContainer>
            <View style={styles.container}>
                <Text style={styles.title}>Profil</Text>
                {user !== null ? <Text>Bonjour {user.firstname} !</Text> : null}
                {user !== null ? <Button title="Déconnexion" onPress={() => logoutMyUser()}/>
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
