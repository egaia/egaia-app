import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import EgaiaContainer from "../components/EgaiaContainer";
import MapView, {Marker, Region} from 'react-native-maps';
import {useContext, useEffect, useState} from "react";
import {LoaderContextType} from "../services/types";
import {LoaderContext} from "../contexts/loader";
import {getAllCollectPoints} from "../repositories/collect_point_repository";
import {CollectPoint} from "../models/CollectPoint";
import {Colors} from "../services/constants";
import * as Location from 'expo-location';

export default function CollectPointsScreen({navigation}: NativeStackScreenProps<any>) {

    const { setLoading } = useContext<LoaderContextType>(LoaderContext)

    const [location, setLocation] = useState<Location.LocationObject | undefined>(undefined);
    const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

    const [collectPoints, setCollectPoints] = useState<CollectPoint[]>([])
    const [selectedCollectPoint, setSelectedCollectPoint] = useState<CollectPoint|undefined>(undefined)

    const [region, setRegion] = useState<Region>({
        latitude: 45.782443169021704,
        longitude: 4.889184942744952,
        latitudeDelta: 0.06,
        longitudeDelta: 0.06,
    })

    useEffect(() => {
        (async () => {
            setLoading(true)

            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
            })
        })().then(() => {
            const getData = async () => await getAllCollectPoints(region.latitude, region.longitude).then(results => {
                if(typeof results !== 'string') {
                    setCollectPoints(results)
                } else {
                    console.error(results)
                }
            }).catch(error => {
                console.error(error.message)
            })

            getData().then(() => setLoading(false))
        })
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

        getData().then(() => setRegion(value))
    }

    return (
        <EgaiaContainer>
            <View style={styles.container}>
                <MapView
                    style={{width: '100%', height: '100%'}}
                    region={region}
                    onRegionChangeComplete={(value) => refreshMarkers(value)}
                    onMarkerDeselect={() => setSelectedCollectPoint(undefined)}
                >
                    {location &&
                      <Marker coordinate={location.coords}>
                        <View style={styles.userLocation}/>
                      </Marker>
                    }
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
                {
                    location &&
                  <TouchableOpacity style={styles.locationButton} onPress={() => {
                      console.log('pressed', location)
                      location && setRegion({
                          latitude: location.coords.latitude,
                          longitude: location.coords.longitude,
                          latitudeDelta: 0.05,
                          longitudeDelta: 0.05
                      })
                  }}>
                    <Image style={styles.buttonIcon} source={require("../assets/icons/target.png")}/>
                  </TouchableOpacity>
                }
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
    userLocation: {
        height: 20,
        width: 20,
        backgroundColor: '#0079fd',
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 50,
        shadowColor: '#0079fd',
        shadowOpacity: 1,
        shadowRadius: 10,
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
    },
    buttonIcon: {
        width: 30,
        height: 30,
        tintColor: Colors.white
    },
    locationButton: {
        position: "absolute",
        padding: 15,
        top: 20,
        right: 20,
        backgroundColor: Colors.primary,
        borderRadius: 50
    },
});
