import {
    Image, KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Colors} from "../services/constants";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useContext, useEffect, useState} from "react";
import {Waste} from "../models/Waste";
import {allWastes, findWaste} from "../repositories/waste_repository";
import Autocomplete from 'react-native-autocomplete-input';
import Loader from "../components/Loader";

const WasteScreen = (props: NativeStackScreenProps<any>) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [waste, setWaste] = useState<Waste>()
    const [wastes, setWastes] = useState<Waste[]>([])
    const [query, setQuery] = useState<string>('')

    const wasteId: number = props.route.params?.wasteId

    const suggestions: Waste[] = query.trim() !== '' ? wastes.filter(waste => waste.id !== wasteId && waste.name.toLowerCase().includes(query.toLowerCase())).slice(0, 4) : []

    useEffect(() => {
        setLoading(true)
        if (wasteId !== undefined) {
            findWaste(wasteId).then(result => {
                setWaste(result)
                allWastes().then(result => {
                    setWastes(result)
                    setLoading(false)
                }).catch(() => setLoading(false))
            }).catch(() => setLoading(false))
        } else {
            setLoading(false)
            props.navigation.goBack()
        }
    }, [])

    const clickOnSuggestion = (wasteId: number) => {
        setQuery('')
        props.navigation.push("Waste", {wasteId})
    }

    // @ts-ignore
    return (
        <SafeAreaView style={styles.globalContainer}>
            {loading && <Loader />}
            <KeyboardAvoidingView style={{height: '100%'}} behavior="padding" enabled>
                <ScrollView style={{backgroundColor: Colors.primary}} bounces={false}
                            showsVerticalScrollIndicator={false}>
                    <View style={styles.searchContainer}>
                        <Text style={styles.textFindWaste}>Rechercher un déchet</Text>
                        <Autocomplete
                            data={suggestions}
                            value={query}
                            onChangeText={(value) => setQuery(value)}
                            placeholder="Saisir un déchet"
                            inputContainerStyle={styles.textPlaceholder}
                            containerStyle={{paddingVertical: 20}}
                            //@ts-ignore
                            renderResultList={({data}) => (
                                <View style={{
                                    backgroundColor: '#FFFFFF',
                                    borderLeftWidth: 2,
                                    borderRightWidth: 2,
                                    borderBottomWidth: 2,
                                    borderBottomLeftRadius: 5,
                                    borderBottomRightRadius: 5,
                                    paddingVertical: 10
                                }}>
                                    {data.map((item: Waste, index: number) => (
                                        <TouchableOpacity key={item.id + '-' + index}
                                                          style={{paddingVertical: 5, paddingHorizontal: 15}}
                                                          onPress={() => clickOnSuggestion(item.id)}>
                                            <Text style={{
                                                fontSize: 16,
                                            }}>
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        />
                    </View>
                    <View style={styles.wasteContainer}>
                        <View style={styles.wasteTextContainer}>
                            <Text style={styles.title}>{waste?.name}</Text>
                            <Text style={styles.category}>{waste?.category.name}</Text>
                        </View>
                        <View style={styles.wasteImageContainer}>
                            <Image style={styles.wasteImage} source={{uri: waste?.image}}/>
                        </View>
                    </View>
                    <View style={styles.wastePartsContainer}>
                        {waste?.parts?.map(part => {
                            return (
                                <View key={`waste-part-${part.id}`} style={styles.singleWastePartContainer}>
                                    <View style={styles.wastePartTextContainer}>
                                        <Text style={styles.wastePartTitle}>{part.name}</Text>
                                        <Text style={styles.wastePartTrash}>{part.trashCan.name}</Text>
                                    </View>
                                    <View style={styles.wastePartImageContainer}>
                                        <Image resizeMode="contain" style={styles.wastePartImage}
                                               source={{uri: part.trashCan.image}}/>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    globalContainer: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: Colors.white,
        paddingBottom: 20
    },

    searchContainer: {
        justifyContent: "space-evenly",
        backgroundColor: Colors.white,
        padding: 20,
    },

    textFindWaste: {
        fontSize: 22,
    },

    textPlaceholder: {
        borderWidth: 2,
        borderColor: Colors.black,
    },

    title: {
        fontSize: 30,
        fontWeight: "800"
    },

    category: {
        fontSize: 16,
        color: "#2B463C"
    },

    wasteContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 50,
        backgroundColor: Colors.white,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },

    wasteTextContainer: {
        width: '50%',
    },

    wasteImageContainer: {
        width: '50%',
    },

    wasteImage: {
        width: 140,
        height: 140
    },

    wastePartsContainer: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 20,
        paddingVertical: 20,
    },

    wastePartTitle: {
        color: Colors.white,
        fontWeight: "800",
        fontSize: 16
    },

    wastePartTrash: {
        color: Colors.white,
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
