import EgaiaContainer from "../../components/EgaiaContainer";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../../services/constants";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Challenge} from "../../models/Challenge";
import {useContext} from "react";
import {UserContext} from "../../contexts/user";
import {UserContextType} from "../../services/types";

const ChallengeScreen = ({navigation, route}: NativeStackScreenProps<any>) => {

    const {user} = useContext<UserContextType>(UserContext)

    const challenge: Challenge = route.params?.challenge

    const clickOnParticipate = () => {
        navigation.replace("Camera", {challenge})
    }

    return (
        <EgaiaContainer>
            <View style={styles.globalContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Défi de la semaine</Text>
                </View>
                <View style={styles.challengeContainer}>
                    <View>
                        <Text style={styles.challengeTitle}>{challenge.title}</Text>
                        <Text style={styles.description}>Pour réussir ton défi, prends une photo et gagne des
                            gaïas.</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        {
                            user !== undefined ?
                                challenge.participation ?
                                    <View style={styles.imageContainer}>
                                        <Image style={styles.image} resizeMode="cover"
                                               source={{uri: challenge.participation.picture}}/>
                                        <Text style={styles.participationText}>Tu as participé à ce défi</Text>
                                        {challenge.participation.valid ?
                                            <Text style={styles.validText}>Celui-ci a été validé félicitations !</Text>
                                            : <Text style={styles.waitText}>Celui-ci est en attente de validation</Text>}
                                    </View>
                                    :
                                    <TouchableOpacity style={styles.button} onPress={clickOnParticipate}>
                                        <Text style={styles.buttonText}>Réaliser le défi</Text>
                                        <Image resizeMode="contain" style={styles.arrow}
                                               source={require("../../assets/img/right-arrow.png")}/>
                                    </TouchableOpacity>
                                :
                                <Text>Connectez-vous pour participer à ce défi</Text>
                        }
                    </View>
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
    titleText: {
        fontSize: 24,
        fontWeight: "800"
    },
    challengeContainer: {
        width: '100%',
        height: '85%',
        backgroundColor: Colors.primary,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    challengeTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: Colors.white,
        marginBottom: 5
    },
    description: {
        fontSize: 16,
        color: Colors.white
    },
    infoContainer: {
        height: '100%',
        width: '100%',
        marginTop: 50
    },
    imageContainer: {
        width: '100%',
        height: 250,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: Colors.white,
    },
    participationText: {
        fontSize: 16,
        color: Colors.white,
        textAlign: "center",
        marginTop: 20
    },
    waitText: {
        fontSize: 16,
        color: Colors.white,
        textAlign: "center",
        marginTop: 10
    },
    validText: {
        fontSize: 18,
        color: Colors.white,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 15,
    },
    button: {
        width: "60%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 30,
        backgroundColor: Colors.white,
        position: "absolute",
        bottom: 150
    },
    buttonText: {
        fontSize: 16
    },
    arrow: {
        width: 20,
        height: 20,
        tintColor: Colors.black
    }
})

export default ChallengeScreen
