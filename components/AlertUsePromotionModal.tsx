import {Modal, StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import {Colors} from "../services/constants";
import {Promotion} from "../models/Promotion";

interface AlertUsePromotionModalProps {
    promotion: Promotion,
    visible: boolean,
    onClose: () => void,
    onPressYes: () => void
}

const AlertUsePromotionModal = ({promotion, visible, onClose, onPressYes}: AlertUsePromotionModalProps) => {
    return (
        <Modal animationType="fade" visible={visible} transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.globalContainer}>
                    {/*<TouchableOpacity style={styles.close} onPress={onClose}>
                        <Image style={styles.icon} source={require("../assets/icons/cross.png")}/>
                    </TouchableOpacity>*/}
                    <View style={styles.bodyContainer}>
                        <Text style={styles.title}>Voulez-vous profitez de cette offre ?</Text>
                        <Text style={{color: Colors.white}}>{promotion.partner?.name} : {promotion.label}</Text>
                        <Text style={{color: Colors.white}}>Vous utiliserez {promotion.cost} de vos gaïas</Text>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity onPress={onClose}>
                                <Text style={styles.btn}>Annuler</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onPressYes}>
                                <Text style={styles.btn}>Utiliser l'offre</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)"
    },

    globalContainer: {
        backgroundColor: Colors.background,
        width: '80%',
        height: '30%',
        borderRadius: 15,
        justifyContent: "center"
    },

    close: {
        height: '10%',
        justifyContent: "center",
        alignItems: "flex-end",
        width: '100%',
        paddingRight: 25,
        paddingTop: 25
    },

    bodyContainer: {
        height: '80%',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    icon: {
        width: 20,
        height: 20,
        tintColor: Colors.white
    },

    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 20,
        color: Colors.white
    },

    btnContainer: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 20
    },

    btn: {
        width: 115,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 5,
        fontWeight: "500",
        textAlign: "center",
        color: Colors.white,
        borderColor: Colors.white
    },
})

export default AlertUsePromotionModal
