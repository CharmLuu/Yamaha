import { StyleSheet } from 'react-native'
import {themeColor} from "./color";

module.exports = StyleSheet.create({
    container:{
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    text:{
        flex: 1
    },
    link:{
        color: themeColor.blue,
    },
    containerError:{
        backgroundColor: themeColor.errorBg
    },
    textError:{
        color: themeColor.error
    },
    containerWarning:{
        backgroundColor: themeColor.warningBg
    },
    textWarning:{
        color: themeColor.warning
    }
})