import {StyleSheet, Text, View} from 'react-native';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useSelector} from "react-redux";
import {User} from "../models/User";
import EgaiaContainer from "../components/EgaiaContainer";

export default function CollectPointsScreen({navigation}: NativeStackScreenProps<any>) {

    const user = useSelector((state: User | null) => state)
    return (
        <EgaiaContainer>
            <View style={styles.container}>
                <Text style={styles.title}>Points de collecte</Text>
                <Text style={styles.title}>{user !== null ? user.firstname : null}</Text>
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
