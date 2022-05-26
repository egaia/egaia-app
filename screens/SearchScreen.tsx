import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import EgaiaContainer from "../components/EgaiaContainer";
import WasteCard from "../components/WasteCard";
import WasteCategoryCard from "../components/WasteCategoryCard";
import {useContext, useEffect, useState} from "react";
import {Waste} from "../models/Waste";
import {WasteCategory} from "../models/WasteCategory";
import {allWasteCategories} from "../repositories/waste_categories_repository";
import {allWastes} from "../repositories/waste_repository";
import {LoaderContextType, UserContextType} from "../services/types";
import {UserContext} from "../contexts/user";
import {LoaderContext} from "../contexts/loader";

export default function SearchScreen({navigation}: NativeStackScreenProps<any>) {

    const { user, setUser } = useContext<UserContextType>(UserContext)
    const { setLoading } = useContext<LoaderContextType>(LoaderContext)

    const [wastes, setWastes] = useState<Waste[]>([])
    const [wasteCategories, setWasteCategories] = useState<WasteCategory[]>([])

    useEffect(() => {
        setLoading(true)

        const getCategories = async () => await allWasteCategories().then(results => {
            setWasteCategories(results)
        }).catch()

        const getWastes = async () => await allWastes().then(results => {
            setWastes(results)
        }).catch()

        getCategories().then(() => {
            getWastes().then(() => setLoading(false)).catch(() => setLoading(false))
        }).catch(() => setLoading(false))
    }, [])

    const goToWasteCategory = (id: number) => {
        navigation.navigate("WasteCategory", {
            wasteCategoryId: id
        })
    }

    const goToWaste = (id: number) => {
        navigation.navigate("Waste", {
            wasteId: id
        })
    }

    return (
        <EgaiaContainer>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {user !== undefined ? <Text style={styles.title}>Bonjour {user.firstname}</Text> : null}
                <View>
                    <Text>Rechercher un déchet</Text>
                    <TextInput placeholder="Saisir un déchet" />
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {wastes.map(waste => {
                        return (
                            <WasteCard key={`waste-${waste.id}`} waste={waste} onPress={() => goToWaste(waste.id)} />
                        )
                    })}
                </ScrollView>
                <View>
                    <Text>Catégories de déchets</Text>
                    <View>
                        {wasteCategories.map(wasteCategory => {
                            return (
                                <WasteCategoryCard key={`waste-category-${wasteCategory.id}`} category={wasteCategory} onPress={() => goToWasteCategory(wasteCategory.id)} />
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </EgaiaContainer>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: "column",
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
