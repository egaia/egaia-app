import {StyleSheet, Text, View} from "react-native";

const ParticipationCard = () => {
    return (
        <View style={styles.participationContainer}>
            <Text>Participation à un défi : 10 G</Text>
            <Text>Utiliser un shampoing solide</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    participationContainer: {
        width: '100%',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#DADADA"
    }
})

export default ParticipationCard
