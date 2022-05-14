import {GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../services/constants";

interface SecondaryButtonProps {
    text: string,
    onPress: (event: GestureResponderEvent) => void
}

const SecondaryButton = (props: SecondaryButtonProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: Colors.black
    },

    text: {
        textTransform: "uppercase",
        textAlign: "center",
        fontWeight: "bold",
        color: Colors.black
    }
})

export default SecondaryButton
