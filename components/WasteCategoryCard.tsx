import {GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {WasteCategory} from "../models/WasteCategory";

interface WasteCategoryCardProps {
    category: WasteCategory,
    onPress ?: (event: GestureResponderEvent) => void
}

const WasteCategoryCard = (props: WasteCategoryCardProps) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.category}>
                <Image style={styles.image} source={{uri: props.category.image}} />
                <Text>{props.category.name}</Text>
                <Text>{"--->"}</Text>
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
        backgroundColor: "#216b1d",
        marginVertical: 10,
        padding: 20
    },

    image: {
        width: 100,
        height: 100
    }
})

export default WasteCategoryCard
