import {Image, ImageBackground as DefaultImageBackground, StyleSheet, Text, View} from "react-native";
import {Colors} from "../services/constants";
import {Challenge} from "../models/Challenge";
import React from "react";

interface ChallengeCardProps {
    challenge: Challenge,
    first: boolean,
    last: boolean
}

const ChallengeCard = (props: ChallengeCardProps) => {

    type ImageBackgroundProps = DefaultImageBackground["props"] & {
        children: React.ReactNode;
    };

    function MyBackground(props: ImageBackgroundProps) {
        return <DefaultImageBackground {...props} />;
    }

    const styles = StyleSheet.create({
        singleParticipationContainer: {
            width: 110,
            height: 150,
            marginLeft: !props.first ? 5 : 0,
            marginRight: !props.last ? 5 : 0,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.primary,
            borderRadius: 15
        },
        singleParticipationText: {
            color: Colors.white,
            fontWeight: "bold",
            textAlign: "center",
        },
        image: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: '100%',
            height: '100%'
        },
        checkIcon: {
            width: 20,
            height: 20,
            tintColor: Colors.white
        }
    })

    return (
        <View style={styles.singleParticipationContainer}>
            {props.challenge.participation ?
                <MyBackground
                    resizeMode="cover"
                    style={styles.image}
                    imageStyle={{borderRadius: 15, opacity: 0.5}}
                    source={{uri: props.challenge.participation.picture}}
                >
                    <Text style={styles.singleParticipationText}>
                        {props.challenge.title}
                    </Text>
                    {props.challenge.participation.valid ?
                        <Image style={styles.checkIcon} source={require("../assets/icons/check.png")}/>
                        :
                        null
                    }
                </MyBackground>
                :
                <Text style={styles.singleParticipationText}>{props.challenge.title}</Text>
            }
        </View>
    )
}

export default ChallengeCard
