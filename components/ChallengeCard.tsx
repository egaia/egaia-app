import {StyleSheet, Text, View} from "react-native";
import {Colors} from "../services/constants";

const ChallengeCard = () => {
    return (
        <View style={styles.singleParticipationContainer}>
            <Text style={styles.singleParticipationText}>Utiliser une gourde</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    singleParticipationContainer: {
        width: 110,
        height: 150,
        marginHorizontal: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderRadius: 15
    },
    singleParticipationText: {
        color: Colors.white,
        fontWeight: "bold",
        textAlign: "center"
    }
})

export default ChallengeCard
