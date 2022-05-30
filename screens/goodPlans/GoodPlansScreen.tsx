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
import Loader from "../../components/Loader";

export default function GoodPlansScreen({navigation}: NativeStackScreenProps<any>) {

    const {user} = useContext<UserContextType>(UserContext)

    const [loading, setLoading] = useState<boolean>(false)
    const [promotions, setPromotions] = useState<Promotion[]>([])

    useEffect(() => {
        setLoading(true)
        getAllPromotions(user?.apiToken)
            .then(promotions => {
                setPromotions(promotions)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    const goToPromotion = (promotion: Promotion) => {
        navigation.navigate("GoodPlan", {promotion})
    }

    return (
        <EgaiaContainer>
            <>{loading && <Loader/>}</>
            <View style={styles.container}>
                {user !== undefined &&
                  <View style={styles.pointsContainer}>
                    <Text style={styles.pointsText}>{user?.points} </Text>
                    <Image style={styles.gaia} source={require("../../assets/img/gaia.png")}/>
                  </View>
                }
                <ScrollView style={styles.partnersScrollContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.partnersContainer}>
                        {
                            promotions.map(promotion => {
                                return (
                                    <PromotionCard key={`promotion-${promotion.id}`} promotion={promotion}
                                                   onPress={() => goToPromotion(promotion)}/>
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
        height: 130,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        shadowOffset: {width: 1, height: 5},
        shadowOpacity: 0.4,
        shadowRadius: 3,

    },

    pointsText: {
        color: Colors.white,
        fontSize: 50,
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
        paddingTop: 20,
        paddingHorizontal: 15
    },

    gaia: {
        tintColor: Colors.white,
        width: 50,
        height: 50
    },
});
