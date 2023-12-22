import React, {useState} from 'react'
import {
    Platform,
    ScrollView,
    Text,
    Button,
    View,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    TextInput
} from 'react-native'
import {styleButton, styleForm, stylePadding} from '../theme'
import i18n from "../utils/i18n";
import {
    IS_LOGGED_IN,
} from '../data/queries/isLoggedIn';
import { useQuery } from '@apollo/client';


export default function Home() {
    // const { data } = useQuery(IS_LOGGED_IN);
    // console.log(data?.isLoggedIn)




  return (
    <View style={[stylePadding.pxBase, stylePadding.pyBase]}>
        <View>
            <Text className="text-red-600">HomeScreen</Text>

        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    btnDate:{
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wrapInput:{
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        height: 40,
        paddingHorizontal: 15,
        justifyContent: 'center',
    }
})