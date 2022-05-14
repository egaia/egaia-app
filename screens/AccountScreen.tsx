import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import EgaiaContainer from "../components/EgaiaContainer";
import {deleteUserInLocalStorage} from "../services/local_storage";
import {UserContext} from "../contexts/user";
import {useContext, useEffect} from "react";
import {UserContextType} from "../services/types";
import SecondaryButton from "../components/SecondaryButton";
import PrimaryButton from "../components/PrimaryButton";
import {Colors} from "../services/constants";
import ParticipationCard from "../components/ParticipationCard";

export default function AccountScreen({navigation}: NativeStackScreenProps<any>) {

    const { user, setUser } = useContext<UserContextType>(UserContext)

    const loginMyUser = () => {
        navigation.navigate("Auth", "Login")
    }

    const logoutMyUser = () => {
        deleteUserInLocalStorage().then(() => {
            setUser(undefined)
        })
    }

    return (
        <EgaiaContainer>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.profileContainer}>
                    <View style={styles.profileInfoContainer}>
                        <Image style={styles.profilePicture} source={require("../assets/icons/utilisateur.png")} />
                        <Text>{user?.firstname} {user?.lastname}</Text>
                        <Text>username</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <View style={styles.button}>
                            <SecondaryButton text="Modifier mon profil" onPress={() => {}} />
                        </View>
                        <View style={styles.button}>
                            <PrimaryButton text="Me deconnecter" onPress={logoutMyUser} />
                        </View>
                    </View>
                </View>
                <View style={styles.pointsContainer}>
                    <View style={styles.gaiaContainer}>
                        <Text>Nombre de gaïa :</Text>
                        <Text>{user?.points} G</Text>
                    </View>
                    <View style={styles.historicContainer}>
                        <Text>Historique :</Text>
                        <ParticipationCard />
                        <ParticipationCard />
                        <ParticipationCard />
                        <ParticipationCard />
                        <ParticipationCard />
                        <ParticipationCard />
                        <ParticipationCard />
                        <ParticipationCard />
                        <ParticipationCard />
                        <ParticipationCard />
                    </View>
                </View>
            </ScrollView>
        </EgaiaContainer>
    );
}

const styles = StyleSheet.create({
    scroll: {
        height: '100%',
        width: '100%',
    },

    profileContainer: {
        width: '100%',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity:  0.1,
        shadowRadius: 0,
    },

    profileInfoContainer: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20
    },

    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50
    },

    buttonsContainer: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },

    button: {
        width: '50%',
        paddingHorizontal: 5
    },

    pointsContainer: {
        alignItems: "center",
        paddingHorizontal: 20,
    },

    gaiaContainer: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        paddingVertical: 20,
        paddingHorizontal: 30,
        marginVertical: 30,
        borderRadius: 15
    },

    historicContainer: {
        width: '100%',
        alignItems: "flex-start"
    },
});
