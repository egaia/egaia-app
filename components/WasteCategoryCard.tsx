import {GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {WasteCategory} from "../models/WasteCategory";
import {Colors} from "../services/constants";

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
        backgroundColor: Colors.primary,
        marginVertical: 10,
        padding: 20,
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 15
    },

    image: {
        width: 100,
        height: 100
    }
})

export default WasteCategoryCard
