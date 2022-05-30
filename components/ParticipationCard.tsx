import {StyleSheet, Text, View, Image} from "react-native";
import {UserHistoricItem} from "../models/User";
import {Colors} from "../services/constants";

interface ParticipationCardProps {
    historicItem: UserHistoricItem,
    withoutBorder?: boolean
}

const ParticipationCard = ({historicItem, withoutBorder}: ParticipationCardProps) => {
    const styles = StyleSheet.create({
        participationContainer: {
            width: '100%',
            paddingVertical: 10,
            borderBottomWidth: withoutBorder ? 0 : 1,
            borderBottomColor: "#DADADA"
        },
        numberGaiaContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        title: {
            fontSize: 15,
            fontWeight: "600"
        },
        gaia: {
            width: 15,
            height: 15,
            tintColor: Colors.black,
        },
    })

    return (
        <View style={styles.participationContainer}>
            {
                historicItem.type === 'challenge' &&
                    <View style={styles.numberGaiaContainer}>
                        <Text style={styles.title}>
                          Participation à un défi :
                            {historicItem.valid ? '+ ' + historicItem.points : 'En attente de validation'}
                        </Text>
                        {historicItem.valid ? <Image style={styles.gaia} source={require("../assets/img/gaia.png")}/> : null}
                    </View>
            }
            {
                historicItem.type === 'promotion' &&
                    <View style={styles.numberGaiaContainer}>
                        <Text style={styles.title}>Utilisation d'une promotion : - {historicItem.points} </Text>
                        <Image style={styles.gaia} source={require("../assets/img/gaia.png")}/>
                    </View>
            }
            <Text>{historicItem.label}</Text>
        </View>
    )
}

export default ParticipationCard
