import {GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../services/constants";
import {Promotion} from "../models/Promotion";

interface PartnerCardProps {
    promotion: Promotion,
    onPress: (event: GestureResponderEvent) => void
}

const PromotionCard = (props: PartnerCardProps) => {
    return (
        <TouchableOpacity style={styles.partnerContainer} onPress={props.onPress}>
            <Image style={styles.partnerImage} resizeMode="cover" source={{uri: props.promotion.partner?.image}}/>
            <View style={styles.partnerTextContainer}>
                <Text style={styles.partnerText}>{props.promotion.partner?.name}: {props.promotion.label}</Text>
                <View style={styles.numberGaiaContainer}>
                    <Text style={styles.gaiaText}>{props.promotion.cost} </Text>
                    <Image style={styles.gaia} source={require("../assets/img/gaia.png")}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    partnerContainer: {
        width: "100%",
        height: 200,
        marginBottom: 20
    },

    partnerImage: {
        width: "100%",
        height: "60%",
        backgroundColor: Colors.primary,
        borderTopRightRadius: 28,
        borderTopLeftRadius: 28
    },

    partnerTextContainer: {
        width: "100%",
        height: "40%",
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderBottomRightRadius: 28,
        borderBottomLeftRadius: 28
    },

    partnerText: {
        color: Colors.white,
        fontSize: 18, fontWeight: "bold",
        width: "70%"
    },
    numberGaiaContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    gaiaText: {
        color: Colors.secondary,
        fontSize: 22, fontWeight: "bold",
    },

    gaia: {
        tintColor: Colors.secondary,
        width: 22,
        height: 22,
    },
})

export default PromotionCard
