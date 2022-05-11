import {StyleSheet, Text, View} from 'react-native';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import EgaiaContainer from "../components/EgaiaContainer";

export default function ChallengesScreen({navigation}: NativeStackScreenProps<any>) {
    return (
        <EgaiaContainer>
            <View style={styles.container}>
                <Text style={styles.title}>Défis</Text>
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
