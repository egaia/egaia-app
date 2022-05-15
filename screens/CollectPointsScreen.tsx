import {StyleSheet, Text, View} from 'react-native';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import EgaiaContainer from "../components/EgaiaContainer";
import MapView, {Marker, Region} from 'react-native-maps';
import {useContext, useEffect, useState} from "react";
import {LoaderContextType} from "../services/types";
import {LoaderContext} from "../contexts/loader";
import {getAllCollectPoints} from "../repositories/collect_point_repository";
import {CollectPoint} from "../models/CollectPoint";
import {Colors} from "../services/constants";

export default function CollectPointsScreen({navigation}: NativeStackScreenProps<any>) {

    const { setLoading } = useContext<LoaderContextType>(LoaderContext)

    const [collectPoints, setCollectPoints] = useState<CollectPoint[]>([])
    const [selectedCollectPoint, setSelectedCollectPoint] = useState<CollectPoint|undefined>(undefined)

    const initialRegion: Region = {
        latitude: 45.764043,
        longitude: 4.835659,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    useEffect(() => {
        setLoading(true)

        const getData = async () => await getAllCollectPoints(initialRegion.latitude, initialRegion.longitude).then(results => {
            if(typeof results !== 'string') {
                setCollectPoints(results)
            } else {
                console.error(results)
            }
        }).catch(error => {
            console.error(error.message)
        })

        getData().then(() => setLoading(false))
    }, [])

    const refreshMarkers = (value: Region) => {
        const getData = async () => await getAllCollectPoints(value.latitude, value.longitude).then(results => {
            if(typeof results !== 'string') {
                setCollectPoints(results)
            } else {
                console.error(results)
            }
        }).catch(error => {
            console.error(error.message)
        })

        getData().then()
    }

    return (
        <EgaiaContainer>
            <View style={styles.container}>
                <MapView
                    style={{width: '100%', height: '100%'}}
                    initialRegion={initialRegion}
                    minZoomLevel={12}
                    onRegionChangeComplete={(value) => refreshMarkers(value)}
                    onMarkerDeselect={() => setSelectedCollectPoint(undefined)}
                >
                    {collectPoints.map(collectPoint => {
                        return (
                            <Marker
                                key={`collect-point-${collectPoint.id}`}
                                coordinate={{latitude: collectPoint.latitude, longitude:  collectPoint.longitude}}
                                image={require("../assets/icons/marqueur2.png")}
                                onSelect={() => setSelectedCollectPoint(collectPoint)}
                            />
                        )
                    })}
                </MapView>
                {selectedCollectPoint !== undefined ?
                    <View style={styles.addressGlobalContainer}>
                        <View style={styles.trashCansContainer}>
                            <Text>{selectedCollectPoint.type === 2 ? "Verre" : "Autre"}</Text>
                        </View>
                        <View style={styles.addressContainer}>
                            <Text>{selectedCollectPoint.address}</Text>
                        </View>
                    </View>
                    :
                    null
                }
            </View>
        </EgaiaContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    addressGlobalContainer: {
        height: '20%',
        width: '85%',
        position: "absolute",
        bottom: 15,
    },
    trashCansContainer: {
        height: '70%',
        width: '100%',
        padding: 20,
        backgroundColor: Colors.primary,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    addressContainer: {
        height: '30%',
        width: '100%',
        padding: 10,
        backgroundColor: Colors.secondary,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    }
});
