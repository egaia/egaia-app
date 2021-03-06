import {GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Waste} from "../models/Waste";
import {Colors} from "../services/constants";

interface WasteLittleCardProps {
    waste: Waste,
    onPress: (event: GestureResponderEvent) => void
}

const WasteLittleCard = (props: WasteLittleCardProps) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <Text style={styles.text}>{props.waste.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.secondary,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginVertical: 5
    },

    text: {
        fontWeight: "500"
    }
})

export default WasteLittleCard
