import {Button, StyleSheet, Text} from 'react-native';

import {SafeAreaView} from "react-native-safe-area-context";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {TabsParamList} from "../services/types";

export default function AccountScreen({navigation}: NativeStackScreenProps<TabsParamList, "Profile">) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Profil</Text>
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
