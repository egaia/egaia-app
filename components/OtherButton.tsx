import {GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../services/constants";

interface OtherButtonProps {
    text: string,
    onPress: (event: GestureResponderEvent) => void
}

const OtherButton = (props: OtherButtonProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.background,
        padding: 20,
        borderRadius: 10,
    },

    text: {
        textTransform: "uppercase",
        textAlign: "center",
        fontWeight: "bold",
        color: Colors.white
    }
})

export default OtherButton
