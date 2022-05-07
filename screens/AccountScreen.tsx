import {Button, StyleSheet, Text} from 'react-native';

import {SafeAreaView} from "react-native-safe-area-context";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {TabsParamList} from "../services/types";
import {useDispatch, useSelector} from "react-redux";
import {User} from "../models/User";
import {login, logout} from "../store/actions/user.actions";

export default function AccountScreen({navigation}: NativeStackScreenProps<TabsParamList, "Profile">) {

    const user = useSelector((state: User|null) => state)
    const dispatch = useDispatch()

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Profil</Text>
            {user !== null ? <Text>Bonjour {user.name} !</Text> : null}
            {user !== null ? <Button title="Déconnexion" onPress={() => dispatch(logout())}/>
                : <Button title="Connexion" onPress={() => dispatch(login())}/>
            }
        </SafeAreaView>
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
