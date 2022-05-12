import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import EgaiaContainer from "../components/EgaiaContainer";
import {useSelector, useStore} from "react-redux";
import {User} from "../models/User";
import WasteCard from "../components/WasteCard";
import WasteCategoryCard from "../components/WasteCategoryCard";
import {useEffect, useState} from "react";
import {Waste} from "../models/Waste";
import {WasteCategory} from "../models/WasteCategory";
import {allWasteCategories} from "../repositories/waste_categories_repository";
import {allWastes} from "../repositories/waste_repository";

export default function SearchScreen({navigation}: NativeStackScreenProps<any>) {

    const user = useSelector((state: User | null) => state)

    const [wastes, setWastes] = useState<Waste[]>([])
    const [wasteCategories, setWasteCategories] = useState<WasteCategory[]>([])

    useEffect(() => {
        allWasteCategories().then(results => {
            if(typeof(results) !== 'string') {
                setWasteCategories(results)
            } else {
                console.error(results)
            }
        }).catch(error => {
            console.error(error)
        })

        allWastes().then(results => {
            if(typeof(results) !== 'string') {
                setWastes(results)
            } else {
                console.error(results)
            }
        }).catch(error => {
            console.error(error)
        })
    }, [])

    return (
        <EgaiaContainer>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {user !== null ? <Text style={styles.title}>Bonjour {user.firstname}</Text> : null}
                <View>
                    <Text>Rechercher un déchet</Text>
                    <TextInput placeholder="Saisir un déchet" />
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {wastes.map(waste => {
                        return (
                            <WasteCard key={`waste-${waste.id}`} waste={waste} />
                        )
                    })}
                </ScrollView>
                <View>
                    <Text>Catégories de déchets</Text>
                    <View>
                        {wasteCategories.map(wasteCategory => {
                            return (
                                <WasteCategoryCard key={`waste-category-${wasteCategory.id}`} category={wasteCategory} />
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
