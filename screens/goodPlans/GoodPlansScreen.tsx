import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import EgaiaContainer from "../../components/EgaiaContainer";
import {Colors} from "../../services/constants";
import PartnerCard from "../../components/PartnerCard";

export default function GoodPlansScreen({navigation}: NativeStackScreenProps<any>) {

    const goToPartner = () => {
        navigation.navigate("GoodPlan")
    }

    return (
        <EgaiaContainer>
            <View style={styles.container}>
                <View style={styles.pointsContainer}>
                    <Text style={styles.pointsText}>250 G</Text>
                </View>
                <ScrollView style={styles.partnersScrollContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.partnersContainer}>
                        <PartnerCard onPress={goToPartner} />
                        <PartnerCard onPress={goToPartner} />
                        <PartnerCard onPress={goToPartner} />
                        <PartnerCard onPress={goToPartner} />
                        <PartnerCard onPress={goToPartner} />
                        <PartnerCard onPress={goToPartner} />
                    </View>
                </ScrollView>
            </View>
        </EgaiaContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    pointsContainer: {
        width: '100%',
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity:  0.4,
        shadowRadius: 3,

    },

    pointsText: {
        color: Colors.white,
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center"
    },

    partnersScrollContainer: {
        width: "100%",
    },

    partnersContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 40,
        paddingHorizontal: 15
    },
});
