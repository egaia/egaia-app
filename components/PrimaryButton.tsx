import {GestureResponderEvent, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Colors} from "../services/constants";

interface PrimaryButtonProps {
    text: string,
    onPress: (event: GestureResponderEvent) => void
}

const PrimaryButton = (props: PrimaryButtonProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.black,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: Colors.black
    },

    text: {
        textTransform: "uppercase",
        textAlign: "center",
        fontWeight: "800",
        fontSize: 11,
        color: Colors.white
    }
})

export default PrimaryButton
