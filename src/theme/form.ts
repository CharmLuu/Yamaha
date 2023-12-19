import { StyleSheet } from 'react-native'
import {themeColor} from "./color";

module.exports = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: themeColor.grey1,
        paddingHorizontal: 15,
        fontSize: 14,
        height: 36,
        marginBottom: 10
    },
    labelInput:{
        marginBottom: 5
    },
    labelRequire: {
        color: themeColor.error
    },
    errorText:{
        color: themeColor.error,
        marginBottom: 10,
        marginTop: -5,
        fontSize: 10
    },
    errorInput:{
        borderColor: themeColor.error,
    },
    passwordContainer:{
        position: 'relative'
    },
    passwordIcon:{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 40,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3
    },
})