import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {NativeStackScreenProps} from "@react-navigation/native-stack";
import EgaiaContainer from "../components/EgaiaContainer";
import MapView, {Marker, Region} from 'react-native-maps';
import React, {useEffect, useState} from "react";
import {WasteType} from "../services/types";
import {getAllCollectPoints} from "../repositories/collect_point_repository";
import {CollectPoint} from "../models/CollectPoint";
import {Colors} from "../services/constants";
import * as Location from 'expo-location';
import Loader from "../components/Loader";

export default function CollectPointsScreen({navigation}: NativeStackScreenProps<any>) {

    const [loading, setLoading] = useState<boolean>(false)

    const [location, setLocation] = useState<Location.LocationObject | undefined>(undefined);
    const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

    const mapRef = React.createRef<MapView>()

    const [collectPoints, setCollectPoints] = useState<CollectPoint[]>([])
    const [selectedCollectPoint, setSelectedCollectPoint] = useState<CollectPoint | undefined>(undefined)

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
            getAllCollectPoints(region.latitude, region.longitude).then(results => {
                setCollectPoints(results)
                setLoading(false)
            }).catch(() => setLoading(false))
        }).catch(() => setLoading(false))
    }, [])

    useEffect(() => {
        if (selectedCollectPoint) {
            setRegion({
                latitude: selectedCollectPoint.latitude,
                longitude: selectedCollectPoint.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02
            })
            mapRef.current?.animateToRegion({
                latitude: selectedCollectPoint.latitude,
                longitude: selectedCollectPoint.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            })
        } else {
            mapRef.current?.animateToRegion(region)
        }
    }, [selectedCollectPoint])

    const refreshMarkers = (value: Region) => {
        getAllCollectPoints(value.latitude, value.longitude).then(results => {
            setCollectPoints(results)
        }).catch()
    }

    const clickOnMarker = (collectPoint: CollectPoint) => {
        setSelectedCollectPoint(collectPoint)
        mapRef.current?.animateToRegion({
            latitude: collectPoint.latitude,
            longitude: collectPoint.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
        })
    }

    const markerStyle = StyleSheet.create({
        pointMarker: {
            width: Dimensions.get("window").width * 0.05,
            height: Dimensions.get("window").height * 0.05,
        },
        pointMarkerSelected: {
            width: Dimensions.get("window").width * 0.1,
            height: Dimensions.get("window").height * 0.1,
        }
    })

    return (
        <EgaiaContainer>
            {loading && <Loader/>}
            <View style={styles.container}>
                <MapView
                    ref={mapRef}
                    style={{width: '100%', height: '100%'}}
                    initialRegion={region}
                    onRegionChangeComplete={(value) => refreshMarkers(value)}
                    onMarkerDeselect={() => setSelectedCollectPoint(undefined)}
                >
                    {location &&
                      <Marker style={{
                          position: "absolute",
                          zIndex: 1000
                      }} coordinate={location.coords}>
                        <View style={styles.userLocation}/>
                      </Marker>
                    }
                    {collectPoints && collectPoints.map(collectPoint => {
                        return (
                            <Marker
                                key={`collect-point-${collectPoint.id}`}
                                coordinate={{latitude: collectPoint.latitude, longitude: collectPoint.longitude}}
                                onSelect={() => clickOnMarker(collectPoint)}
                            >
                                <Image
                                    resizeMode="contain"
                                    style={[selectedCollectPoint?.id === collectPoint.id ? markerStyle.pointMarkerSelected : markerStyle.pointMarker]}
                                    source={collectPoint.type === WasteType.Glass ? require("../assets/img/marker-verre.png") : require("../assets/icons/marqueur2.png")}/>
                            </Marker>
                        )
                    })}
                </MapView>
                {
                    location &&
                  <TouchableOpacity style={styles.locationButton} onPress={() => {
                      location && mapRef.current?.animateToRegion({
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
                            <View
                                style={[
                                    styles.trashCanPoint,
                                    {
                                        backgroundColor: selectedCollectPoint.type === WasteType.Glass ? '#01AE54' : 'gray'
                                    }
                                ]}
                            />
                            <Text style={styles.trashCanText}>
                                {selectedCollectPoint.type === WasteType.Glass && "Poubelle verte (verre)"}
                            </Text>
                        </View>
                        <View style={styles.addressContainer}>
                            <Text style={styles.addressText}>{selectedCollectPoint.address}</Text>
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
        width: '85%',
        position: "absolute",
        bottom: 15,
    },
    trashCansContainer: {
        width: '100%',
        padding: 20,
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderTopRightRadius: 28,
        borderTopLeftRadius: 28,
    },
    trashCanPoint: {
        width: 14,
        height: 14,
        borderRadius: 50,
        marginRight: 10,
    },
    trashCanText: {
        fontSize: 14,
        color: Colors.white
    },
    addressContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: Colors.secondary,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },
    addressText: {
        fontSize: 14,
        fontWeight: "500"
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
