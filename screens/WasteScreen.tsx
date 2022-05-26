import EgaiaContainer from "../components/EgaiaContainer";
import {Image, StyleSheet, Text, TextInput, View} from "react-native";
import {Colors} from "../services/constants";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useContext, useEffect, useState} from "react";
import {Waste} from "../models/Waste";
import {findWaste} from "../repositories/waste_repository";
import {LoaderContextType} from "../services/types";
import {LoaderContext} from "../contexts/loader";

const WasteScreen = (props: NativeStackScreenProps<any>) => {

    const { setLoading } = useContext<LoaderContextType>(LoaderContext)

    const [waste, setWaste] = useState<Waste>()

    const wasteId: number = props.route.params?.wasteId

    useEffect(() => {
        setLoading(true)
        if(wasteId !== undefined) {
            findWaste(wasteId).then(result => {
                setWaste(result)
                setLoading(false)
            }).catch(() => setLoading(false))
        } else {
            setLoading(false)
            props.navigation.goBack()
        }
    }, [])

    return (
        <EgaiaContainer>
            <View style={styles.globalContainer}>
                <View style={styles.searchContainer}>
                    <Text>Rechercher un déchet</Text>
                    <TextInput placeholder="Saisir un déchet" />
                </View>
                <View style={styles.wasteContainer}>
                    <View style={styles.wasteTextContainer}>
                        <Text>{waste?.name}</Text>
                        <Text>{waste?.category.name}</Text>
                    </View>
                    <View style={styles.wasteImageContainer}>
                        <Image style={styles.wasteImage} source={{uri: waste?.image}} />
                    </View>
                </View>
                <View style={styles.wastePartsContainer}>
                    {waste?.parts?.map(part => {
                        return (
                            <View key={`waste-part-${part.id}`} style={styles.singleWastePartContainer}>
                                <View style={styles.wastePartTextContainer}>
                                    <Text>{part.name}</Text>
                                    <Text>{part.trashCan.name}</Text>
                                </View>
                                <View style={styles.wastePartImageContainer}>
                                    <Image style={styles.wastePartImage} source={require("../assets/icons/flamme.png")} />
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        </EgaiaContainer>
    )
}

const styles = StyleSheet.create({

    globalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.primary
    },

    searchContainer: {
        height: '20%',
        justifyContent: "space-evenly",
        backgroundColor: Colors.white
    },

    wasteContainer: {
        height: '30%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.white,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },

    wasteTextContainer: {
        height: '100%',
        width: '50%',
    },

    wasteImageContainer: {
        height: '100%',
        width: '50%',
    },

    wasteImage: {
        width: 100,
        height: 100
    },

    wastePartsContainer: {
        height: '50%',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
    },

    singleWastePartContainer: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 15,
    },

    wastePartTextContainer: {
        width: "70%",
        justifyContent: "space-evenly",
    },

    wastePartImageContainer: {
        width: "30%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: Colors.secondary,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15
    },

    wastePartImage: {
        width: 75,
        height: 75
    }
})

export default WasteScreen
