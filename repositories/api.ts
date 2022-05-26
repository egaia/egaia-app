//export const endpointUrl = 'http://egaia-manager.test/api'
import Snackbar from "react-native-snackbar";

export const endpointUrl = 'https://manager.egaia.fr/api'

export const displaySnackBarErrors = (data: any) => {
    if(data.message) {
        Snackbar.show({
            text: data.message,
            duration: Snackbar.LENGTH_SHORT
        })
    } else {
        let message = ''
        for (const key in data) {
            message += key + ': '
            for (const childKey in data[key]) {
                message += data[key][childKey]
            }
        }

        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_SHORT
        })
    }
}
