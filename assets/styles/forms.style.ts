import {StyleSheet} from "react-native";

export const formsStyle = StyleSheet.create({
    input: {
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 2,
        height: 45,
        margin: 20,
    },
    button: {
        backgroundColor: "black",
        paddingVertical: 15,
        margin: 20
    },
    inputError: {
        fontSize: 10,
        color: "crimson",
        fontWeight: "bold"
    }
})
