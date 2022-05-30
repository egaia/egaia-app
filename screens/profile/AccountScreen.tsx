import {Image, Platform, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {UserContext} from "../../contexts/user";
import {useContext} from "react";
import {UserContextType} from "../../services/types";
import SecondaryButton from "../../components/SecondaryButton";
import PrimaryButton from "../../components/PrimaryButton";
import {Colors} from "../../services/constants";
import ParticipationCard from "../../components/ParticipationCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SafeAreaView} from 'react-native-safe-area-context';

export default function AccountScreen(props: NativeStackScreenProps<any>) {

    const {user, setUser} = useContext<UserContextType>(UserContext)

    const logoutMyUser = () => {
        AsyncStorage.removeItem('api_token').then(() => {
            setUser(undefined)
        })
    }

    const goToUpdate = () => {
        props.navigation.navigate("UpdateProfile")
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Colors.white,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
        }}>
            <ScrollView>
                <View style={styles.profileContainer}>
                    <View style={styles.profileInfoContainer}>
                        <Image style={styles.profilePicture} source={{uri: user?.image}}/>
                        <Text style={styles.username}>{user?.firstname} {user?.lastname}</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <View style={styles.button}>
                            <SecondaryButton text="Modifier mon profil" onPress={goToUpdate}/>
                        </View>
                        <View style={styles.button}>
                            <PrimaryButton text="Me deconnecter" onPress={logoutMyUser}/>
                        </View>
                    </View>
                </View>
                <View style={styles.pointsContainer}>
                    <View style={styles.gaiaContainer}>
                        <Text style={styles.TextNbGaia}>Nombre de gaïa :</Text>
                        <View style={styles.numberGaiaContainer}>
                            <Text style={styles.NbGaia}>{user?.points} </Text>
                            <Image style={styles.gaia} source={require("../../assets/img/gaia.png")}/>
                        </View>

                    </View>
                    <View style={styles.historicContainer}>
                        <Text style={styles.textHistoric}>Historique :</Text>
                        {user?.historic.map((historicItem, index) => {
                            return (
                                <ParticipationCard key={`historic-${historicItem.type}-${historicItem.id}`}
                                                   historicItem={historicItem}
                                                   withoutBorder={index + 1 >= user?.historic.length}/>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        width: '100%',
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {width: 1, height: 4},
        shadowOpacity: 0.1,
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

    username: {
        fontSize: 28,
        marginTop: 10,
    },

    buttonsContainer: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20,
        paddingHorizontal: 15


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

    TextNbGaia: {
        color: Colors.white,
        fontSize: 22,
        fontWeight: "800",
    },

    NbGaia: {
        color: Colors.white,
        fontSize: 30,
        fontWeight: "500"
    },

    numberGaiaContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },


    gaia: {
        width: 30,
        height: 30,
        tintColor: Colors.white,
    },


    historicContainer: {
        width: '100%',
        alignItems: "flex-start"
    },

    textHistoric: {
        fontWeight: "900",
        textTransform: "uppercase",
        fontSize: 15
    }
});
