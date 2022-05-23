import EgaiaContainer from "../../components/EgaiaContainer";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../../services/constants";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Challenge} from "../../models/Challenge";

const ChallengeScreen = ({navigation, route}: NativeStackScreenProps<any>) => {

    const challenge: Challenge = route.params?.challenge

    const clickOnParticipate = () => {
        navigation.replace("Camera", {challenge})
    }

    return (
        <EgaiaContainer>
            <View style={styles.globalContainer}>
                <View style={styles.titleContainer}>
                    <Text>Défi de la semaine</Text>
                </View>
                <View style={styles.challengeContainer}>
                    <View>
                        <Text style={styles.challengeTitle}>{challenge.title}</Text>
                        <Text style={styles.description}>{challenge.content.replace(/(<([^>]+)>)/gi, "")}</Text>
                        <Text style={styles.description}>Pour réussir ton défi, prends une photo et gagne des gaïas</Text>
                    </View>
                    {
                        challenge.participation ?
                            <View>
                                <Image resizeMode="center" style={{width: 300, height: 300}} source={{uri: challenge.participation.picture}} />
                                <Text>Tu as participé à ce défi</Text>
                                {challenge.participation.valid ?
                                    <Text>Celui-ci a été validé félicitations</Text>
                                    : <Text>Celui-ci est en attente de validation</Text>}
                            </View>
                            :
                            <TouchableOpacity style={styles.button} onPress={clickOnParticipate}>
                                <Text>Réaliser le défi</Text>
                                <Text>{'-->'}</Text>
                            </TouchableOpacity>
                    }
                </View>
            </View>
        </EgaiaContainer>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    titleContainer: {
        width: '100%',
        height: '15%',
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 20
    },
    challengeContainer: {
        width: '100%',
        height: '85%',
        backgroundColor: Colors.primary,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    challengeTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.white
    },
    description: {
        fontSize: 16,
        color: Colors.white
    },
    button: {
        width: "60%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 20,
        backgroundColor: Colors.white
    }
})

export default ChallengeScreen
