import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const WasteCategoryCard = () => {
    return (
        <TouchableOpacity>
            <View style={styles.category}>
                <Image style={styles.image} source={require("../assets/icons/flamme.png")} />
                <Text>Papeterie</Text>
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
        backgroundColor: "#216b1d",
        marginVertical: 10,
        padding: 20
    },

    image: {
        width: 100,
        height: 100
    }
})

export default WasteCategoryCard
