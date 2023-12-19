import React from 'react'
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native'
import {styleButton, styleForm, stylePadding} from '../theme'
import i18n from "../utils/i18n";
import {
    IS_LOGGED_IN,
} from '../data/queries/isLoggedIn';
import { useQuery } from '@apollo/client';

export default function Home() {
    const { data } = useQuery(IS_LOGGED_IN);
    console.log(data?.isLoggedIn)
  return (
    <View style={[stylePadding.pxBase, stylePadding.pyBase]}>
        <Text style={styleForm.labelInput}>Email <Text style={styleForm.labelRequire}>*</Text></Text>
        <TextInput
            // value={form.email}
            autoCapitalize="none"
            style={styleForm.input}
        />
        <Text style={styleForm.errorText}>{i18n.t('requireField')}</Text>
        <Text style={styleForm.errorText}>{i18n.t("errorMessEmail")}</Text>
      <Pressable style={styleButton.btnTheme}>
        <Text style={styleButton.btnTextTheme}>Button Theme</Text>
      </Pressable>
    </View>
  )
}
