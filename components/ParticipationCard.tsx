import {StyleSheet, Text, View} from "react-native";
import {UserHistoricItem} from "../models/User";

interface ParticipationCardProps {
    historicItem: UserHistoricItem,
    withoutBorder ?: boolean
}

const ParticipationCard = ({historicItem, withoutBorder}: ParticipationCardProps) => {
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
            {
                historicItem.type === 'challenge' && <Text>Participation à un défi : + {historicItem.points} G</Text>
            }
            {
                historicItem.type === 'promotion' && <Text>Utilisation d'une promotion : - {historicItem.points} G</Text>
            }
            <Text>{historicItem.label}</Text>
        </View>
    )
}

export default ParticipationCard
