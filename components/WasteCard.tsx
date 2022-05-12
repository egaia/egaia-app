import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Waste} from "../models/Waste";

interface WasteCardProps {
    waste: Waste
}

const WasteCard = (props: WasteCardProps) => {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: props.waste.image}} />
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.name}>{props.waste.name}</Text>
                    <Text>{props.waste.category.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: 250,
        marginHorizontal: 10,
        borderRadius: 15,
    },

    imageContainer: {
        backgroundColor: '#216b1d',
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },

    image: {
        width: 100,
        height: 100
    },

    labelContainer: {
        backgroundColor: '#b5de77',
        padding: 10
    },

    name: {
        fontSize: 20,
        fontWeight: "bold"
    },
})

export default WasteCard
