import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styleButton, styleForm, stylePadding} from '../theme';
import i18n from "../utils/i18n";
import {useNavigation} from "@react-navigation/native";
import {CREATE_CUSTOMER_TOKEN} from "../data/mutations/createCustomerToken";
import { saveCustomerToken } from '../utils/storage';
import {IS_LOGGED_IN} from "../data/queries/isLoggedIn";
import {showMessage} from "react-native-flash-message";
import { useMutation } from '@apollo/client';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { isEmailValid, isNonEmptyString } from '../utils';
import {Spinner} from "../components/Spinner";

export default function Login() {
  const navigation = useNavigation()
  const [secureEntry, toggleSecureEntry] = useState(true);
  const [messError, setMessError] = useState(false);
  const [textError, setTextError] = useState('');
  const [form, setValues] = useState({
    email: '',
    incorrectEmail: false,
    incorrectEmailNonEmpty: false,
    password: '',
    incorrectPassword: false,
    incorrectPasswordNonEmpty: false,
  });

  const [createCustomerToken, { loading, data, error }] = useMutation(CREATE_CUSTOMER_TOKEN,{
        async update(cache, { data: _data }) {
          if (_data?.generateCustomerToken?.token) {
            await saveCustomerToken(_data.generateCustomerToken.token);
            cache.writeQuery({
              query: IS_LOGGED_IN,
              data: {
                isLoggedIn: true,
              },
            });
          }
        },
      }
  );

  const submitHandler = async () => {
    try {
      await createCustomerToken({
        variables: {
          email: form.email,
          password: form.password
        },
      });
    } catch {}
  }

  useEffect(() => {
    if (data?.generateCustomerToken?.token) {
      showMessage({
        message: "Login account is successfully",
        type: 'success',
        duration: 10000
      });
    }

  }, [data]);

  useEffect(() => {
    if (error){
      setMessError(true)
      setTextError(error.message)
    }
  }, [error]);

  if (loading) return <Spinner />

  const checkField = (fieldKey, fieldErrorKey, fieldValidator) => {
    if (!fieldValidator(form[fieldKey])) {
      setValues(prevState => ({
        ...prevState,
        [fieldErrorKey]: true,
      }));
      return false;
    }
    return true;
  };

  const validateForm  = () => {
    let check1 = checkField('email', 'incorrectEmailNonEmpty', isNonEmptyString);
    let check2 = checkField('email', 'incorrectEmail', isEmailValid);
    let check3 = checkField('password', 'incorrectPasswordNonEmpty', isNonEmptyString);
    return check1 && check2 && check3
  };

  const handleSubmit = () => {
    if(!validateForm()){
      console.log('validate fail')
    } else{
      submitHandler()
    }
  }

  return (
      <ScrollView
          style={[stylePadding.pxBase, stylePadding.pyBase]}
          keyboardShouldPersistTaps='handled'
      >
        {messError && (
            <View style={{
              backgroundColor: '#fae5e5',
              paddingVertical: 10,
              paddingHorizontal: 15,
              flexDirection: 'row',
              gap: 10,
              marginBottom: 10,
              alignItems: 'center'

            }}>
              <MaterialCommunityIcons
                  name="close-circle"
                  size={24}
                  color={'#e02b27'}
              />
              <Text style={{
                color: '#e02b27',
                flex: 1
              }}>{textError}</Text>
            </View>
        )}

        <Text style={styleForm.labelInput}>Email <Text style={styleForm.labelRequire}>*</Text></Text>
        <TextInput
            value={form.email}
            autoCapitalize="none"
            style={styleForm.input}
            onChangeText={value =>
                setValues(prevState => ({
                  ...prevState,
                  email: value.trim(),
                  incorrectEmail: false,
                  incorrectEmailNonEmpty: false,
                }))
            }
        />
        {form.incorrectEmailNonEmpty ? (
            <Text style={styleForm.errorText}>{i18n.t('requireField')}</Text>
        ) : ''}
        {!form.incorrectEmailNonEmpty && form.incorrectEmail? (
            <Text style={styleForm.errorText}>{i18n.t("errorMessEmail")}</Text>
        ) : ''}

        <Text style={styleForm.labelInput}>{i18n.t('password')} <Text style={styleForm.labelRequire}>*</Text></Text>
        <View style={styleForm.passwordContainer}>
          <TouchableOpacity
              onPress={() => toggleSecureEntry(!secureEntry)}
              style={styleForm.passwordIcon}
          >
            <MaterialCommunityIcons
                name={secureEntry ? 'eye' : 'eye-off'}
                size={20}
            />
          </TouchableOpacity>
          <TextInput
              value={form.password}
              autoCapitalize="none"
              secureTextEntry={secureEntry}
              textContentType="password"
              autoCorrect={false}
              style={styleForm.input}
              onChangeText={value =>
                  setValues(prevState => ({
                    ...prevState,
                    password: value.trim(),
                    incorrectPassword: false,
                    incorrectPasswordNonEmpty: false
                  }))
              }
          />
        </View>
        {form.incorrectPasswordNonEmpty ? (
            <Text style={styleForm.errorText}>{i18n.t('requireField')}</Text>
        ) : ''}

        <Pressable
            style={styleButton.btnTheme}
            onPress={handleSubmit}
        >
          <Text style={styleButton.btnTextTheme}>{i18n.t("send")}</Text>
        </Pressable>

        <View style={styles.actionContainer}>
          <TouchableOpacity
              style={styles.btnSecond}
              onPress={() => navigation.navigate('Register')}
          >
            <MaterialCommunityIcons name="account" size={16} />
            <Text>{i18n.t("createanAccount")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.btnSecond}
              onPress={() => navigation.navigate('ForgotPassword')}
          >
            <MaterialCommunityIcons name="key" size={16} />
            <Text>{i18n.t("forgotPassword")}</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
  )
}

const styles = StyleSheet.create({
  btnSecond:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  actionContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  }
})
