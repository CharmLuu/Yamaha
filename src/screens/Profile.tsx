import React from 'react'
import {Pressable, Text, View} from 'react-native'
import {useNavigation} from "@react-navigation/native";
import { saveCustomerToken } from '../utils/storage';
import {getApolloClient} from "../client";
import {useQuery} from "@apollo/client";
import {
  GET_CUSTOMER
} from '../data/queries/getCustomer';
import i18n from "../utils/i18n";
import {styleButton, stylePadding} from "../theme";

export default function Profile() {
  const navigation = useNavigation()

  const { loading, error, data } = useQuery(GET_CUSTOMER);

  const handleLogout = async () => {
    try {
      // clear apollo cache
      const client = await getApolloClient();
      // client.resetStore();
      client.cache.reset();
      await saveCustomerToken(null);
      navigation.navigate('Home')
    } catch (err) {
      throw new Error(err)
    }
  }

  if (error){
    return (
        <View>
          <Text>{error.message}</Text>
          <Pressable
              onPress={handleLogout}
              style={styleButton.btnBorder}
          >
            <Text>{i18n.t('logout')}</Text>
          </Pressable>
        </View>
    )
  }

  return (
    <View
        style={[stylePadding.pxBase, stylePadding.pyBase]}
    >
      <Pressable
          onPress={handleLogout}
          style={styleButton.btnBorder}
      >
        <Text>{i18n.t('logout')}</Text>
      </Pressable>
      <Text>{`Tên người dùng: ${data?.customer?.firstname} ${data?.customer?.lastname}`}</Text>
      <Text>{`Email: ${data?.customer?.email}`}</Text>
      <Text>{`Dob: ${data?.customer?.date_of_birth}`}</Text>
      <Text>{`Gender: ${data?.customer?.gender}`}</Text>
    </View>
  )
}
