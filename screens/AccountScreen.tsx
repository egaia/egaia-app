import {Button, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {SafeAreaView} from "react-native-safe-area-context";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {TabsParamList} from "../services/types";
import {useDispatch, useSelector} from "react-redux";
import {getUser, removeUser} from "../store/user/userSlice";
import {UserProviderState} from "../store/configureStore";

export default function AccountScreen({navigation}: NativeStackScreenProps<TabsParamList, "Profile">) {

    const userProvider = useSelector((state: UserProviderState) => state.userProvider)
    const dispatch = useDispatch()

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Profil</Text>
            {userProvider.user.name !== '' ? <Text>Bonjour {userProvider.user.name} !</Text> : null}
            {userProvider.user.name !== '' ? <Button title="Déconnexion" onPress={() => dispatch(removeUser())}/>
                : <Button title="Connexion" onPress={() => dispatch(getUser())}/>
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
