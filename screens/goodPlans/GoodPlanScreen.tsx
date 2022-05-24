import EgaiaContainer from "../../components/EgaiaContainer";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import OtherButton from "../../components/OtherButton";

const GoodPlanScreen = () => {
    return (
        <EgaiaContainer>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.globalContainer}>
                    <Image style={styles.image} resizeMode="cover" source={require("../../assets/icons/flamme.png")} />
                    <View style={styles.infoContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>YaBio: Un dessert offert</Text>
                            <Text style={styles.titleText}>250 G</Text>
                        </View>
                        <View>
                            <Text>
                                Raptim igitur properantes ut motus sui rumores celeritate nimia praevenirent,
                                vigore corporum ac levitate confisi per flexuosas semitas ad summitates collium tardius evadebant.
                                et cum superatis difficultatibus arduis ad supercilia venissent fluvii Melanis alti et verticosi, q
                                ui pro muro tuetur accolas circumfusus, augente nocte adulta terrorem quievere paulisper lucem opperientes.
                                arbitrabantur enim nullo inpediente transgressi inopino adcursu adposita quaeque vastare,
                                sed in cassum labores pertulere gravissimos.
                            </Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <OtherButton text="Utiliser cette offre" onPress={() => {}} />
                    </View>
                </View>
            </ScrollView>
        </EgaiaContainer>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        width: "100%"
    },

    globalContainer: {
        width: "100%",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },

    image: {
        width: "100%",
        height: 250,
        backgroundColor: 'red'
    },

    infoContainer: {
        width: "100%",
        paddingVertical: 40,
        paddingHorizontal: 20,
        marginBottom: 20
    },

    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },

    titleText: {
        fontSize: 18,
        fontWeight: "bold"
    },

    buttonContainer: {
        width: "80%"
    }
})

export default GoodPlanScreen
