import {StyleSheet} from "react-native";

export const formsStyle = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: "column"
    },
    inputText: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 5
    },
    input: {
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 2,
        height: 50,
        marginBottom: 5
    },
    button: {
        backgroundColor: "black",
        paddingVertical: 15,
        margin: 20
    },
    inputError: {
        fontSize: 10,
        color: "crimson",
        fontWeight: "bold",
        marginBottom: 10
    }
})
