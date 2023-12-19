import { StyleSheet } from 'react-native'
import {themeColor} from "./color";

module.exports = StyleSheet.create({
    btnTheme: {
        backgroundColor: themeColor.theme,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
    },
    btnTextTheme: {
        color: themeColor.white,
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    btnBorder:{
        borderWidth: 1,
        borderColor: themeColor.grey1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
    }
})