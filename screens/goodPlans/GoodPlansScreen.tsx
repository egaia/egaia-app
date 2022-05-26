import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import EgaiaContainer from "../../components/EgaiaContainer";
import {Colors} from "../../services/constants";
import PromotionCard from "../../components/PromotionCard";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../contexts/user";
import {UserContextType} from "../../services/types";
import {Promotion} from "../../models/Promotion";
import {getAllPromotions} from "../../repositories/promotion_repository";

export default function GoodPlansScreen({navigation}: NativeStackScreenProps<any>) {

    const { user } = useContext<UserContextType>(UserContext)

    const [promotions, setPromotions] = useState<Promotion[]>([])

    useEffect(() => {
        getAllPromotions(user?.apiToken)
            .then(promotions => setPromotions(promotions))
            .catch()
    }, [])

    const goToPromotion = (promotion: Promotion) => {
        navigation.navigate("GoodPlan", {promotion})
    }

    return (
        <EgaiaContainer>
            <View style={styles.container}>
                { user !== undefined &&
                  <View style={styles.pointsContainer}>
                    <Text style={styles.pointsText}>{user?.points} G</Text>
                  </View>
                }
                <ScrollView style={styles.partnersScrollContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.partnersContainer}>
                        {
                            promotions.map(promotion => {
                                return (
                                    <PromotionCard key={`promotion-${promotion.id}`} promotion={promotion} onPress={() => goToPromotion(promotion)} />
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        </EgaiaContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    pointsContainer: {
        width: '100%',
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity:  0.4,
        shadowRadius: 3,

    },

    pointsText: {
        color: Colors.white,
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center"
    },

    partnersScrollContainer: {
        width: "100%",
    },

    partnersContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 40,
        paddingHorizontal: 15
    },
});
