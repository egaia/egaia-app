import {GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Waste} from "../models/Waste";
import {Colors} from "../services/constants";

interface WasteCardProps {
    waste: Waste,
    onPress: (event: GestureResponderEvent) => void,
    first: boolean,
    last: boolean
}

const WasteCard = (props: WasteCardProps) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            width: 250,
            marginLeft: !props.first ? 5 : 0,
            marginRight: !props.last ? 5 : 0,
        },

        imageContainer: {
            backgroundColor: Colors.primary,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
        },

        image: {
            width: 100,
            height: 100
        },

        labelContainer: {
            backgroundColor: Colors.secondary,
            padding: 10,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
        },

        name: {
            fontSize: 20,
            fontWeight: "bold"
        },
    })

    return (
        <TouchableOpacity onPress={props.onPress}>
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

export default WasteCard
