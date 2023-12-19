import React, {useEffect, useState} from "react";
import {Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import {isEmailValid, isNonEmptyString} from "../utils";
import {useMutation} from "@apollo/client";
import {FORGOT_PASSWORD} from "../data/mutations/forgotPassword";
import {showMessage} from "react-native-flash-message";
import {Spinner} from "../components/Spinner";
import {useNavigation} from "@react-navigation/native";
import i18n from "../utils/i18n";
import {styleButton, styleForm, stylePadding} from '../theme'

export default function ForgotPassword() {
  const navigation = useNavigation()

  const [form, setValues] = useState({
    email: '',
    incorrectEmailNonEmpty: false,
    incorrectEmail: false,
  });

  const [forgotPassword, { data, loading, error }] = useMutation(FORGOT_PASSWORD);

  const submitHandler = async () => {
    try {
      await forgotPassword({
        variables: {
          email: form.email,
        },
      });
    } catch {}
  }

  useEffect(() => {
    if (data?.requestPasswordResetEmail) {
      showMessage({
        message: `If there is an account associated with ${form.email} you will receive an email with a link to reset your password`,
        type: 'success',
        duration: 10000
      });
      navigation.navigate('Login')
    }

  }, [data]);

  useEffect(() => {
    if (error){
      showMessage({
        message: `Submission error! ${error.message}`,
        type: "danger",
        duration: 7000
      });
      console.log(error)
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

  const checkValidation = () => {
    let isValid = true;
    isValid = isValid && checkField('email', 'incorrectEmailNonEmpty', isNonEmptyString);
    isValid = isValid && checkField('email', 'incorrectEmail', isEmailValid);
    return isValid;
  };

  const handleSubmit = () => {
    checkField('email', 'incorrectEmailNonEmpty', isNonEmptyString)
    checkField('email', 'incorrectEmail', isEmailValid)
    if(!checkValidation()){
      console.log('validate fail')
    }

    else{
      submitHandler()
      console.log(`Email: ${form.email}`)
    }
  }

  return(
      <ScrollView
          style={[stylePadding.pxBase, stylePadding.pyBase]}
          keyboardShouldPersistTaps='handled'
          automaticallyAdjustKeyboardInsets={true}
      >
        <Text style={{
          marginBottom: 10
        }}>{i18n.t("noteForgotPw")}</Text>

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

        <Pressable
            style={styleButton.btnTheme}
            onPress={handleSubmit}
        >
          <Text style={styleButton.btnTextTheme}>{i18n.t("resetPw")}</Text>
        </Pressable>
      </ScrollView>

  )
}