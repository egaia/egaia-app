import {GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../services/constants";

interface PartnerCardProps {
    onPress: (event: GestureResponderEvent) => void
}

const PartnerCard = (props: PartnerCardProps) => {
    return (
        <TouchableOpacity style={styles.partnerContainer} onPress={props.onPress}>
            <Image style={styles.partnerImage} resizeMode="cover" source={require("../assets/icons/flamme.png")} />
            <View style={styles.partnerTextContainer}>
                <Text style={styles.partnerText}>YaBio: Un dessert offert</Text>
                <Text style={styles.partnerText}>250 G</Text>
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
        fontSize: 18,fontWeight: "bold"
    },
})

export default PartnerCard
