import EgaiaContainer from "../../components/EgaiaContainer";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import OtherButton from "../../components/OtherButton";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useContext, useEffect, useState} from "react";
import {Promotion} from "../../models/Promotion";
import {findPromotion, usePromotion} from "../../repositories/promotion_repository";
import {UserContextType} from "../../services/types";
import {UserContext} from "../../contexts/user";
import {getByApiToken} from "../../repositories/auth_repository";
import AlertUsePromotionModal from "../../components/AlertUsePromotionModal";
import {Colors} from "../../services/constants";
import Loader from "../../components/Loader";

const GoodPlanScreen = ({navigation, route}: NativeStackScreenProps<any>) => {

    const {user, setUser} = useContext<UserContextType>(UserContext)

    const [loading, setLoading] = useState<boolean>(false)
    const [promotion, setPromotion] = useState<Promotion>(route.params?.promotion)
    const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        findPromotion(route.params?.promotion.id!, user?.apiToken)
            .then(response => {
                setPromotion(response)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    const clickOnUse = () => {
        if (user !== undefined) {
            setLoading(true)
            usePromotion(promotion, user?.apiToken!).then(response => {
                if (response) {
                    getByApiToken(user?.apiToken!).then(response => {
                        setUser(response)
                        setAlertModalVisible(false)
                        setLoading(false)
                        navigation.replace("GoodPlans")
                    })
                }
                setLoading(false)
            }).catch(() => setLoading(false))
        }
    }

    return (
        <EgaiaContainer>
            {loading && <Loader/>}
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.globalContainer}>
                    <Image style={styles.image} resizeMode="cover" source={{uri: promotion.partner?.image}}/>
                    <View style={styles.infoContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>{promotion.partner?.name}: {promotion.label}</Text>
                            <View style={styles.numberGaiaContainer}>
                                <Text style={styles.gaiaText}>{promotion.cost} </Text>
                                <Image style={styles.gaia} source={require("../../assets/img/gaia.png")}/>
                            </View>
                        </View>
                        <View>
                            <Text>{promotion.description}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        {
                            user === undefined &&
                          <Text style={styles.hintText}>
                            Connectez-vous pour profiter de l'offre
                          </Text>
                        }
                        {
                            user?.historic.find(historicItem => (historicItem.id === promotion.id && historicItem.type === 'promotion')) !== undefined
                            &&
                          <Text style={styles.hintText}>
                            Vous avez déjà profité de cette offre !
                          </Text>
                        }
                        {
                            (user?.points! < promotion.cost && user?.historic.find(historicItem => (historicItem.id === promotion.id && historicItem.type === 'promotion')) === undefined)
                            &&
                          <Text style={styles.hintText}>
                            Il vous manque {promotion.cost - user?.points!} gaïas pour profiter de cette offre
                          </Text>
                        }
                        <OtherButton
                            text="Utiliser cette offre"
                            disabled={user === undefined || user?.points! < promotion.cost || user?.historic.find(historicItem => (historicItem.id === promotion.id && historicItem.type === 'promotion')) !== undefined}
                            onPress={() => setAlertModalVisible(true)}/>
                    </View>
                </View>
                <AlertUsePromotionModal
                    promotion={promotion}
                    visible={alertModalVisible}
                    onClose={() => setAlertModalVisible(false)}
                    onPressYes={clickOnUse}
                />
            </ScrollView>
        </EgaiaContainer>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        width: "100%"
    },

    globalContainer: {
        width: "100%",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },

    image: {
        width: "100%",
        height: 250,
    },

    infoContainer: {
        width: "100%",
        paddingVertical: 40,
        paddingHorizontal: 20,
        marginBottom: 20
    },

    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },

    titleText: {
        fontSize: 20,
        fontWeight: "800",
        width: "75%"
    },

    buttonContainer: {
        width: "100%",
        paddingHorizontal: 20,
    },

    hintText: {
        textAlign: "center",
        fontSize: 12,
        fontStyle: "italic",
        marginVertical: 20
    },

    numberGaiaContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    gaiaText: {
        fontSize: 20, fontWeight: "bold",
        color: Colors.background,
    },

    gaia: {
        width: 20,
        height: 20,
        tintColor: Colors.background,
    },
})

export default GoodPlanScreen
