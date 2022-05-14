import EgaiaContainer from "../components/EgaiaContainer";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useEffect, useState} from "react";
import {findWasteCategory} from "../repositories/waste_categories_repository";
import {WasteCategory} from "../models/WasteCategory";
import WasteLittleCard from "../components/WasteLittleCard";
import {Colors} from "../services/constants";

const WasteCategoryScreen = (props: NativeStackScreenProps<any>) => {

    const [wasteCategory, setWasteCategory] = useState<WasteCategory>()

    const wasteCategoryId: number = props.route.params?.wasteCategoryId

    useEffect(() => {
        if (wasteCategoryId !== undefined) {
            findWasteCategory(wasteCategoryId).then(result => {
                if (typeof (result) !== 'string') {
                    console.log(result)
                    setWasteCategory(result)
                } else {
                    console.error(result)
                }
            }).catch(error => {
                console.error(error.message)
            })
        } else {
            props.navigation.goBack()
        }
    }, [])

    const goToWaste = (wasteId: number) => {
        props.navigation.navigate("Waste", {wasteId})
    }

    return (
        <EgaiaContainer>
            <View style={styles.container}>
                <View style={styles.categoryContainer}>
                    <Image style={styles.image} source={{uri: wasteCategory?.image}}/>
                    <Text style={styles.categoryName}>{wasteCategory?.name}</Text>
                </View>
                <ScrollView style={styles.wastesContainer} showsVerticalScrollIndicator={false}>
                    {wasteCategory?.wastes?.map(waste => {
                        return (
                            <WasteLittleCard key={`waste-${waste.id}`} waste={waste} onPress={() => goToWaste(waste.id)}/>
                        )
                    })}
                </ScrollView>
            </View>
        </EgaiaContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: "center",
        alignItems: "center"
    },

    categoryContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        height: '18%',
        width: '100%'
    },

    wastesContainer: {
        width: '100%',
        paddingVertical: 30,
        paddingHorizontal: 20,
    },

    image: {
        width: 75,
        height: 75,
        marginRight: 20
    },

    categoryName: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default WasteCategoryScreen
