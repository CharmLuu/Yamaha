import React, {useRef, useState} from "react";
import {Text, TextInput, View, Pressable, ScrollView} from "react-native";
import {styleButton, styleForm} from "../../theme";
import i18n from "../../utils/i18n";
import SelectDropdown from "react-native-select-dropdown";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {isNonEmptyString, isNonEmptyValue} from "../../utils";

const customerAccountTypeData = [
    {
        id: 1,
        value: 'YMS-Yamaha music students'
    },
    {
        id: 2,
        value: 'YMS-Yamaha music staff'
    },
]

export default function Form2() {
    const [form2, setValues2] = useState({
        type: '',
        typeValue: '',
        incorrectType: false,
        number: '',
        incorrectNumber: false,
    });

    const checkField = (fieldKey, fieldErrorKey, fieldValidator) => {
        if (!fieldValidator(form2[fieldKey])) {
            setValues2(prevState => ({
                ...prevState,
                [fieldErrorKey]: true,
            }));
            return false;
        }
        return true;
    };

    const validateForm  = () => {
        let check1 = checkField('type', 'incorrectType', isNonEmptyValue);
        let check2 = checkField('number', 'incorrectNumber', isNonEmptyValue);
        return check1 && check2;
    };

    const handleSubmit = () => {
        if(!validateForm()){
            console.log('validate fail')
        } else{
            console.log(`Type: ${form2.type}`)
            console.log(`Number: ${form2.number}`)
        }
    }

    return(
        <View>
            <Text style={styleForm.labelInput}>Customer Account Type</Text>
            <SelectDropdown
                data={customerAccountTypeData}
                defaultButtonText={form2.typeValue || ' '}
                onSelect={selectedItem =>
                    setValues2(prevState => ({
                        ...prevState,
                        type: selectedItem.id,
                        typeValue: selectedItem.value,
                        incorrectType: false,
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
            {form2.incorrectType ? (
                <Text style={styleForm.errorText}>{i18n.t('requireField')}</Text>
            ) : ''}

            <Text style={styleForm.labelInput}>Customer Account Number</Text>
            <TextInput
                value={form2.number}
                autoCapitalize="none"
                style={styleForm.input}
                keyboardType='numeric'
                onChangeText={value =>
                    setValues2(prevState => ({
                        ...prevState,
                        number: value.trim(),
                        incorrectNumber: false,
                    }))
                }
            />
            {form2.incorrectNumber && (
                <Text style={styleForm.errorText}>{i18n.t('requireField')}</Text>
            )}

            <Pressable
                style={styleButton.btnTheme}
                onPress={handleSubmit}
            >
                <Text style={styleButton.btnTextTheme}>{i18n.t("send")}</Text>
            </Pressable>
        </View>
    )
}