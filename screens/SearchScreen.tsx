import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import EgaiaContainer from "../components/EgaiaContainer";
import {useSelector, useStore} from "react-redux";
import {User} from "../models/User";
import WasteCard from "../components/WasteCard";
import WasteCategoryCard from "../components/WasteCategoryCard";

export default function SearchScreen({navigation}: NativeStackScreenProps<any>) {

    const user = useSelector((state: User | null) => state)

    return (
        <EgaiaContainer>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {user !== null ? <Text style={styles.title}>Bonjour {user.firstname}</Text> : null}
                <View>
                    <Text>Rechercher un déchet</Text>
                    <TextInput placeholder="Saisir un déchet" />
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <WasteCard />
                    <WasteCard />
                    <WasteCard />
                    <WasteCard />
                    <WasteCard />
                    <WasteCard />
                </ScrollView>
                <View>
                    <Text>Catégories de déchets</Text>
                    <View>
                        <WasteCategoryCard />
                        <WasteCategoryCard />
                        <WasteCategoryCard />
                        <WasteCategoryCard />
                        <WasteCategoryCard />
                        <WasteCategoryCard />
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
