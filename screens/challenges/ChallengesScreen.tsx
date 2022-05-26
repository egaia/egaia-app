import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import EgaiaContainer from "../../components/EgaiaContainer";
import {Colors} from "../../services/constants";
import ChallengeCard from "../../components/ChallengeCard";
import {useContext, useEffect, useState} from "react";
import {Challenge} from "../../models/Challenge";
import {AllChallengesApiResponse, getAllChallenges} from "../../repositories/challenge_repository";
import {UserContext} from "../../contexts/user";
import {UserContextType} from "../../services/types";

export default function ChallengesScreen({navigation}: NativeStackScreenProps<any>) {

    const { user } = useContext<UserContextType>(UserContext)

    const [challengesApi, setChallengesApi] = useState<AllChallengesApiResponse|undefined>(undefined)

    useEffect(() => {
        getAllChallenges(user?.apiToken).then(response => {
            if(typeof response !== 'string') {
                setChallengesApi(response)
            } else {
                console.error(response)
            }
        }).catch(error => {
            console.error(error.message)
        })
    }, [])


    const goToChallengeOfTheWeek = () => {
        navigation.navigate("Challenge", {challenge: challengesApi?.currentChallenge})
    }

    const getMonthFullName = (date: Date): string => {
        const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];

        return monthNames[date.getMonth()]+' '+date.getFullYear()
    }

    return (
        <EgaiaContainer>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.globalContainer}>
                    {challengesApi?.currentChallenge && <TouchableOpacity style={styles.challengeOfTheDayContainer} onPress={goToChallengeOfTheWeek}>
                      <View style={styles.challengeOfTheDay}>
                        <Text style={styles.challengeOfTheDayText}>Découvre le défi de la semaine</Text>
                      </View>
                    </TouchableOpacity>}
                    <View style={styles.participationsContainer}>
                        <Text style={styles.participationsTitle}>Tes défis au fil du temps</Text>
                        {
                            challengesApi && challengesApi.challenges.map(challengeApi => {
                                return (
                                    <View key={challengeApi.date_month} style={styles.monthContainer}>
                                        <Text style={styles.month}>{getMonthFullName(new Date(challengeApi.carbon_date))}</Text>
                                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                            { challengeApi.results.map(result => {
                                                return (
                                                    <ChallengeCard key={`challenge-${result.id}`} challenge={result} />
                                                )
                                            }) }
                                        </ScrollView>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        </EgaiaContainer>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        width: '100%',
        height: '100%'
    },
    globalContainer: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    challengeOfTheDayContainer: {
        width: '100%',
        paddingVertical: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    challengeOfTheDay: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        height: Dimensions.get("window").height*0.17,
        backgroundColor: Colors.primary,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25
    },
    challengeOfTheDayText: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.white
    },
    participationsContainer: {
        width: '100%',
    },
    participationsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 20
    },
    monthContainer: {
        marginBottom: 30
    },
    month: {
        marginVertical: 5
    },
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
});
