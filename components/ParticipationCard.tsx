import {StyleSheet, Text, View} from "react-native";
import {Challenge} from "../models/Challenge";

interface ParticipationCardProps {
    challenge: Challenge,
    withoutBorder ?: boolean
}

const ParticipationCard = ({challenge, withoutBorder}: ParticipationCardProps) => {
    const styles = StyleSheet.create({
        participationContainer: {
            width: '100%',
            paddingVertical: 10,
            borderBottomWidth: withoutBorder ? 0 : 1,
            borderBottomColor: "#DADADA"
        }
    })

    return (
        <View style={styles.participationContainer}>
            <Text>Participation à un défi : {challenge.points} G</Text>
            <Text>{challenge.title}</Text>
        </View>
    )
}

export default ParticipationCard
