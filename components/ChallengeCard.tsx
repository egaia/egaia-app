import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {Colors} from "../services/constants";
import {Challenge} from "../models/Challenge";

interface ChallengeCardProps {
    challenge: Challenge
}

const ChallengeCard = (props: ChallengeCardProps) => {
    console.log(props.challenge)
    return (
        <View style={styles.singleParticipationContainer}>
            {props.challenge.participation ?
                <ImageBackground resizeMode="cover" style={styles.image} imageStyle={{borderRadius: 15, opacity: 0.5}} source={{uri: props.challenge.participation.picture}}>
                    <Text style={styles.singleParticipationText}>{props.challenge.title}</Text>
                </ImageBackground>
                :
                <Text style={styles.singleParticipationText}>{props.challenge.title}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    singleParticipationContainer: {
        width: 110,
        height: 150,
        marginHorizontal: 5,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderRadius: 15
    },
    singleParticipationText: {
        color: Colors.white,
        fontWeight: "bold",
        textAlign: "center",
    },
    image: {
        flex: 1,
        justifyContent: "center",
        width: '100%',
        height: '100%'
    },
})

export default ChallengeCard
