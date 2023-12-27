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
import CategoryTree from "../components/CategoryTree";
import CategoryTreeGrid from "../components/CategoryTreeGrid";
import Category from "./Category";


export default function Home() {
    // const { data } = useQuery(IS_LOGGED_IN);
    // console.log(data?.isLoggedIn)




  return (
    <ScrollView style={[stylePadding.pxBase]}>
        {/*<Category/>*/}
        <CategoryTreeGrid id={3} showImg={true} />
        <CategoryTree id={3} />

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
})
