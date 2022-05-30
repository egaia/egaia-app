import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import EgaiaContainer from "../components/EgaiaContainer";
import WasteCard from "../components/WasteCard";
import WasteCategoryCard from "../components/WasteCategoryCard";
import {useContext, useEffect, useState} from "react";
import {Waste} from "../models/Waste";
import {WasteCategory} from "../models/WasteCategory";
import {allWasteCategories} from "../repositories/waste_categories_repository";
import {allWastes} from "../repositories/waste_repository";
import {UserContextType} from "../services/types";
import {UserContext} from "../contexts/user";
import {Colors} from '../services/constants';
import Loader from "../components/Loader";

export default function SearchScreen({navigation}: NativeStackScreenProps<any>) {

    const {user, setUser} = useContext<UserContextType>(UserContext)

    const [loading, setLoading] = useState<boolean>(false)
    const [wastes, setWastes] = useState<Waste[]>([])
    const [wasteCategories, setWasteCategories] = useState<WasteCategory[]>([])

    const [query, setQuery] = useState<string>('')

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

    const wastesFiltered = wastes.filter(waste => waste.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    const wasteCategoriesFiltered = wasteCategories.filter(wasteCategory => wasteCategory.name.toLowerCase().includes(query.toLowerCase()))

    return (
        <EgaiaContainer>
            <>{loading && <Loader/>}</>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled keyboardVerticalOffset={10}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{paddingTop: 40}}>
                        {user !== undefined ? <Text style={styles.title}>Bonjour {user.firstname}</Text> : null}
                        <Text style={styles.textFindWaste}>Rechercher un déchet</Text>
                        <TextInput style={styles.textPlaceholder} placeholder="Saisir un déchet"
                                   onChangeText={(value) => setQuery(value)}/>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {wastesFiltered.map((waste, index) => {
                            return (
                                <WasteCard
                                    key={`waste-${waste.id}`}
                                    waste={waste}
                                    onPress={() => goToWaste(waste.id)}
                                    first={index === 0}
                                    last={index === wastesFiltered.length - 1}
                                />
                            )
                        })}
                    </ScrollView>
                    <View>
                        <Text style={styles.titleCategories}>Catégories de déchets</Text>
                        <View>
                            {wasteCategoriesFiltered.map(wasteCategory => {
                                return (
                                    <WasteCategoryCard key={`waste-category-${wasteCategory.id}`}
                                                       category={wasteCategory}
                                                       onPress={() => goToWasteCategory(wasteCategory.id)}/>
                                )
                            })}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </EgaiaContainer>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        flexDirection: "column",
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
    },

    textFindWaste: {
        fontSize: 22,
    },

    textPlaceholder: {
        marginVertical: 20,
        borderWidth: 2,
        borderColor: Colors.black,
        padding: 10,
    },

    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },

    titleCategories: {
        marginTop: 40,
        marginBottom: 10,
        fontSize: 21,
        fontWeight: "800",
    }
});
