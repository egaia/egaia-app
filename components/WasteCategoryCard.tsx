import {GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {WasteCategory} from "../models/WasteCategory";
import {Colors} from "../services/constants";

interface WasteCategoryCardProps {
    category: WasteCategory,
    onPress?: (event: GestureResponderEvent) => void
}

const WasteCategoryCard = (props: WasteCategoryCardProps) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.category}>
                <Image style={styles.image} source={{uri: props.category.image}}/>
                <Text style={styles.text}>{props.category.name}</Text>
                <View style={styles.arrowContainer}>
                    <Image style={styles.arrow} source={require("../assets/img/right-arrow.png")}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    category: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: Colors.primary,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 15,

    },

    text: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: "800",
        width: "50%"
    },

    image: {
        width: 75,
        height: 75,
        marginRight: 15
    },

    arrowContainer: {
        height: 70,
        flexDirection: "column",
        justifyContent: "flex-end",
    },

    arrow: {}
})

export default WasteCategoryCard
