import React, {useEffect, useRef, useState} from 'react'
import {Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Platform} from "react-native";
import {isEmailValid, isPasswordValid, isNonEmptyString, isNonEmptyValue} from '../utils';
import {showMessage} from "react-native-flash-message";
import {
  CREATE_CUSTOMER
} from "../data/mutations/createCustomer";
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native'
import SelectDropdown from 'react-native-select-dropdown'
import {Spinner} from "../components/Spinner";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import i18n from "../utils/i18n";
import {styleButton, styleForm, stylePadding} from '../theme';
import {themeColor} from "../theme/color";
import CheckBox from 'expo-checkbox';

const genders = [
  {
    id: 1,
    value: 'Male'
  },
  {
    id: 2,
    value: 'Female'
  },
]
const days = Array.from({length: 31}, (_, i) => i + 1)
const months = Array.from({length: 12}, (_, i) => i + 1)
const years = Array.from({length: 104}, (_, i) => i + 1920)

export default function Register() {
  const navigation = useNavigation()
  const [isSelected, setSelection] = useState(false);
    const [secureEntry, toggleSecureEntry] = useState(true);
    const [secureEntryCf, toggleSecureEntryCf] = useState(true);
  const [form, setValues] = useState({
    firstName: '',
    incorrectFirstName: false,
    lastName: '',
    incorrectLastName: false,
    email: '',
    incorrectEmailNonEmpty: false,
    incorrectEmail: false,
    password: '',
    incorrectPasswordNonEmpty: false,
    incorrectPassword: false,
    cfpassword: '',
    incorrectCfPassword: false,
    incorrectCfPasswordNonEmpty: false,
    gender: '',
    genderValue: '',
    incorrectGender: false,
    date: '',
    incorrectDate: false,
    month: '',
    incorrectMonth: false,
    year: '',
    incorrectYear: false,
  });


  const [createAccount, { data, loading, error }] = useMutation(CREATE_CUSTOMER);

  const submitHandler = async () => {
    try {
      await createAccount({
        variables: {
          firstname: form.firstName,
          lastname: form.lastName,
          email: form.email,
          password: form.password,
          date_of_birth: `${form.date}-${form.month}-${form.year}`,
          gender: form.gender,
          is_subscribed: isSelected,
        },
      });
    } catch {}
  }
  useEffect(() => {
    if (data?.createCustomerV2?.customer?.email) {
      const cus = data.createCustomerV2.customer
      showMessage({
        message: "Create an account is successfully",
        description: `Hi ${cus.firstname} ${cus.lastname}`,
        type: 'success',
        duration: 10000
      });
      navigation.navigate('Account')
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
  const checkCfPw = (fieldKey1, fieldKey2, fieldErrorKey2) => {
    if (!(form[fieldKey1] === form[fieldKey2])) {
      setValues(prevState => ({
        ...prevState,
        [fieldErrorKey2]: true,
      }));
      return false;
    }
    return true;
  };

  const checkValidation = () => {
    let checkF1 = checkField('firstName', 'incorrectFirstName', isNonEmptyString);
    let checkF2 = checkField('lastName', 'incorrectLastName', isNonEmptyString);
    let checkF3 = checkField('email', 'incorrectEmailNonEmpty', isNonEmptyString);
    let checkF4 = checkField('email', 'incorrectEmail', isEmailValid);
    let checkF5 = checkField('password', 'incorrectPasswordNonEmpty', isNonEmptyString);
    let checkF6 = checkField('password', 'incorrectPassword', isPasswordValid)
    let checkF7 = checkField('cfpassword', 'incorrectCfPasswordNonEmpty', isNonEmptyString);
    let checkF8 = checkCfPw('password','cfpassword', 'incorrectCfPassword');
    let checkF9 = checkField('gender', 'incorrectGender', isNonEmptyValue);
    let checkF10 = checkField('date', 'incorrectDate', isNonEmptyValue);
    let checkF11 = checkField('month', 'incorrectMonth', isNonEmptyValue);
    let checkF12 = checkField('year', 'incorrectYear', isNonEmptyValue);
    let isValid = checkF1 && checkF2 && checkF3 && checkF4 && checkF5 && checkF6 && checkF7 && checkF8 && checkF9 && checkF10 && checkF11 && checkF12
    return isValid;
  };

  const handleSubmit = () => {
    if(!checkValidation()){
      console.log('validate fail')
    }

    else{
      submitHandler()
    }
  }

  return (
          <ScrollView
              style={[stylePadding.pxBase, stylePadding.pyBase]}
              keyboardShouldPersistTaps='handled'
              automaticallyAdjustKeyboardInsets={true}
          >
            <Text style={styleForm.labelInput}>{i18n.t("dateOfBirth")} <Text style={styleForm.labelRequire}>*</Text></Text>
            <SelectDropdown
                data={days}
                defaultButtonText={form.date || i18n.t("day")}
                buttonStyle={[styleForm.input, styleForm.selectOption]}
                buttonTextStyle={styleForm.buttonTextStyle}
                renderDropdownIcon={isOpened => {
                  return <MaterialCommunityIcons
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      size={20}
                  />;
                }}
                onSelect={selectedItem =>
                    setValues(prevState => ({
                      ...prevState,
                      date: selectedItem,
                      incorrectDate: false,
                    }))
                }

            />
            {form.incorrectDate ? (
                <Text style={styleForm.errorText}>{i18n.t('requireField')}</Text>
            ) : ''}
            <SelectDropdown
                data={months}
                defaultButtonText={form.month || i18n.t("month")}
                buttonStyle={[styleForm.input, styleForm.selectOption]}
                buttonTextStyle={styleForm.buttonTextStyle}
                renderDropdownIcon={isOpened => {
                  return <MaterialCommunityIcons
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      size={20}
                  />;
                }}
                onSelect={selectedItem =>
                    setValues(prevState => ({
                      ...prevState,
                      month: selectedItem,
                      incorrectMonth: false,
                    }))
                }
            />
            {form.incorrectMonth ? (
                <Text style={styleForm.errorText}>{i18n.t('requireField')}</Text>
            ) : ''}
            <SelectDropdown
                data={years}
                defaultButtonText={form.year || i18n.t("year")}
                buttonStyle={[styleForm.input, styleForm.selectOption]}
                buttonTextStyle={styleForm.buttonTextStyle}
                renderDropdownIcon={isOpened => {
                  return <MaterialCommunityIcons
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      size={20}
                  />;
                }}
                onSelect={selectedItem =>
                    setValues(prevState => ({
                      ...prevState,
                      year: selectedItem,
                      incorrectYear: false,
                    }))
                }
            />
            {form.incorrectYear ? (
                <Text style={styleForm.errorText}>{i18n.t('requireField')}</Text>
            ) : ''}
            <Text style={styleForm.labelInput}>{i18n.t("gender")} <Text style={styleForm.labelRequire}>*</Text></Text>
            <SelectDropdown
                data={genders}
                defaultButtonText={form.genderValue || ' '}
                onSelect={selectedItem =>
                    setValues(prevState => ({
                      ...prevState,
                      gender: selectedItem.id,
                      genderValue: selectedItem.value,
                      incorrectGender: false,
                    }))
                }
                buttonStyle={[styleForm.input, styleForm.selectOption]}
                buttonTextStyle={styleForm.buttonTextStyle}
                renderDropdownIcon={isOpened => {
                  return <MaterialCommunityIcons
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      size={20}
                  />;
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.value;
                }}
                rowTextForSelection={(item, index) => {
                  return item.value;
                }}
            />
            {form.incorrectGender ? (
                <Text style={styleForm.errorText}>{i18n.t('requireField')}</Text>
            ) : ''}
            <Text style={styleForm.labelInput}>{i18n.t("firstName")} <Text style={styleForm.labelRequire}>*</Text></Text>
            <TextInput
                style={styleForm.input}
                value={form.firstName}
                onChangeText={value =>
                    setValues(prevState => ({
                      ...prevState,
                      firstName: value.trim(),
                      incorrectFirstName: false,
                    }))
                }
                // onSubmitEditing={() => lastNameInputRef.current.focus()}
            />
            {form.incorrectFirstName ? (
                <Text style={styleForm.errorText}>{i18n.t('requireField')}</Text>
            ) : ''}

            <Text style={styleForm.labelInput}>{i18n.t("lastName")} <Text style={styleForm.labelRequire}>*</Text></Text>
            <TextInput
                style={styleForm.input}
                value={form.lastName}
                onChangeText={value =>
                    setValues(prevState => ({
                      ...prevState,
                      lastName: value.trim(),
                      incorrectLastName: false,
                    }))
                }
            />
            {form.incorrectLastName ? (
                <Text style={styleForm.errorText}>{i18n.t('requireField')}</Text>
            ) : ''}

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

            <Text style={styleForm.labelInput}> {i18n.t("password")} <Text style={styleForm.labelRequire}>*</Text></Text>
              <View style={styles.passwordContainer}>
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
                      style={styleForm.input}
                      textContentType="password"
                      placeholder={"Password"}
                      autoCorrect={false}
                      secureTextEntry={secureEntry}
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
            {!form.incorrectPasswordNonEmpty && form.incorrectPassword ? (
                <Text style={styleForm.errorText}>{i18n.t("errorMessPw")}</Text>
            ) : ''}

            <Text style={styleForm.labelInput}>{i18n.t("confirmPassword")} <Text style={styleForm.labelRequire}>*</Text></Text>
              <View style={styles.passwordContainer}>
                  <TouchableOpacity
                      onPress={() => toggleSecureEntryCf(!secureEntryCf)}
                      style={styleForm.passwordIcon}
                  >
                      <MaterialCommunityIcons
                          name={secureEntry ? 'eye' : 'eye-off'}
                          size={20}
                      />
                  </TouchableOpacity>
                  <TextInput
                      value={form.cfpassword}
                      autoCapitalize="none"
                      style={styleForm.input}
                      textContentType="password"
                      placeholder={"Confirm Password"}
                      autoCorrect={false}
                      secureTextEntry={secureEntryCf}
                      onChangeText={value =>
                          setValues(prevState => ({
                              ...prevState,
                              cfpassword: value.trim(),
                              incorrectCfPassword: false,
                              incorrectCfPasswordNonEmpty: false
                          }))
                      }
                  />
              </View>

            {form.incorrectCfPasswordNonEmpty ? (
                <Text style={styleForm.errorText}>{i18n.t('requireField')}</Text>
            ) : ''}
            {!form.incorrectCfPasswordNonEmpty && form.incorrectCfPassword ? (
                <Text style={styleForm.errorText}>{i18n.t("errorMessCfPw")}</Text>
            ) : ''}

            <View style={{
                  flexDirection: 'row',
                  gap: 10,
                  marginBottom: 15,
                alignItems: 'center'
            }}>
                  <CheckBox
                      value={isSelected}
                      onValueChange={(newValue) => setSelection(newValue)}
                      color={isSelected ? themeColor.theme : undefined}
                  />
                  <Text>{i18n.t("signUpForNewsletter")}</Text>
              </View>
            <TouchableOpacity
                onPress={handleSubmit}
                style={[styleButton.btnTheme, styles.btnSubmit]}
            >
              <Text style={styleButton.btnTextTheme}>{i18n.t("submit")}</Text>
            </TouchableOpacity>
          </ScrollView>
  )
}

const styles = StyleSheet.create({
    btnSubmit: {
        marginBottom: 30
    }
})
