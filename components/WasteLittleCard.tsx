import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Waste} from "../models/Waste";

interface WasteLittleCardProps {
    waste: Waste
}

const WasteLittleCard = (props: WasteLittleCardProps) => {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <Text>{props.waste.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#96ea94',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    }
})

export default WasteLittleCard
