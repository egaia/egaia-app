import {GestureResponderEvent, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Colors} from "../services/constants";

interface OtherButtonProps {
    text: string,
    disabled: boolean,
    onPress: (event: GestureResponderEvent) => void
}

const OtherButton = (props: OtherButtonProps) => {

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            backgroundColor: props.disabled ? 'gray' : Colors.background,
            padding: 20,
            borderRadius: 10,
        },

        text: {
            textTransform: "uppercase",
            textAlign: "center",
            fontWeight: "800",
            color: Colors.white
        }
    })

    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress} disabled={props.disabled}>
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default OtherButton
