import React, {useRef, useState} from "react";
import {ScrollView, StyleSheet, Text, TextInput, View, Button, Platform, Pressable} from "react-native";
import {styleButton, styleForm, stylePadding} from "../theme";
import {themeColor} from "../theme/color";
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import i18n from "../utils/i18n";

export default function AccountVertifyRequired() {
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [show, setShow] = useState(false);
    const field2InputRef = useRef<TextInput | null>();
    const field3InputRef = useRef<TextInput | null>();
    const field4InputRef = useRef<TextInput | null>();
    const [form, setValues] = useState({
        field1: '',
        incorrectField1: false,
        field2: '',
        incorrectField2: false,
        field3: '',
        incorrectField3: false,
        field4: '',
        incorrectField4: false,
    });

    const onChange = (event, selectedDate) => {
        if(event.type == "set"){
            const currentDate = selectedDate;
            setDate(currentDate);
            setShowDate(true)

            if(Platform.OS === "android"){
                toggleDatePicker();
                setDate(currentDate)
            }
        } else{
            toggleDatePicker()
        }
    };

    const toggleDatePicker = () => {
        setShow(!show);
    };

    const confirmIosDate = () => {
        setDate(date)
        toggleDatePicker()
    };

    const formatDate = (rawDate) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        day = day < 10 ? `0${day}` : day
        month = month < 10 ? `0${month}` : month

        return `${day}-${month}-${year}`
    }

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

    const handleSubmit = () => {
        console.log(`Date: ${formatDate(date)}`)
        console.log(`Last 4 Characters: ${form.field1}-${form.field2}-${form.field3}-${form.field4}`)
    }

    return(
        <ScrollView
            style={[stylePadding.pxBase, stylePadding.pyBase]}
            keyboardShouldPersistTaps='handled'
        >
            <Text>Please fill in either set of infomation below</Text>
            <Text>Last 4 Characters:</Text>
            <View style={styles.containerInput}>
                <TextInput
                    style={[styleForm.input, styles.input]}
                    maxLength={1}
                    autoCapitalize="words"
                    onChangeText={(value) => {
                        if (value.length === 1) {
                            field2InputRef.current?.focus(); // Focus on the other TextInput
                        }

                        setValues(prevState => ({
                            ...prevState,
                            field1: value.trim(),
                            incorrectField1: false,
                        }))
                    }}
                />
                <TextInput
                    style={[styleForm.input, styles.input]}
                    ref={(ref) => (field2InputRef.current = ref)}
                    onChangeText={(value) => {
                        if (value.length === 1) {
                            field3InputRef.current?.focus(); // Focus on the other TextInput
                        }
                        setValues(prevState => ({
                            ...prevState,
                            field2: value.trim(),
                            incorrectField2: false,
                        }))
                    }}
                />
                <TextInput
                    style={[styleForm.input, styles.input]}
                    ref={(ref) => (field3InputRef.current = ref)}
                    onChangeText={(value) => {
                        if (value.length === 1) {
                            field4InputRef.current?.focus(); // Focus on the other TextInput
                        }

                        setValues(prevState => ({
                            ...prevState,
                            field3: value.trim(),
                            incorrectField3: false,
                        }))
                    }}
                />
                <TextInput
                    style={[styleForm.input, styles.input]}
                    ref={(ref) => (field4InputRef.current = ref)}
                    onChangeText={(value) => {
                        setValues(prevState => ({
                            ...prevState,
                            field4: value.trim(),
                            incorrectField4: false,
                        }))
                    }}
                />
            </View>
            {/*DateOfBirth*/}
            <Pressable
                onPress={toggleDatePicker}
                className={"flex-row gap-x-2 items-center mb-4"}
            >
                <View
                    className={"border border-gray-300 flex-1 h-10 px-4 justify-center"}
                >
                    {!show && (
                        <Text>
                            {showDate? formatDate(date) : 'Date Of Birth'}
                        </Text>
                    )}
                </View>
                <MaterialCommunityIcons name="calendar-month-outline" size={22} />
            </Pressable>

            {show && (
                <DateTimePicker
                    mode={'date'}
                    value={date}
                    onChange={onChange}
                    display={'spinner'}
                    maximumDate={new Date()}
                    minimumDate={new Date('1990-1-1')}
                    selected={""}
                />
            )}


            {show && Platform.OS === 'ios' && (
                <View className="items-center mb-2">
                    <Pressable
                        className="bg-red-300 h-10 items-center justify-center w-40 rounded-[20px]"
                        onPress={confirmIosDate}
                    >
                        <Text className="text-white">Confirm</Text>
                    </Pressable>
                </View>
            )}
            <Pressable
                style={styleButton.btnTheme}
                onPress={handleSubmit}
            >
                <Text style={styleButton.btnTextTheme}>{i18n.t("send")}</Text>
            </Pressable>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    containerInput:{
        flexDirection: 'row',
        gap: 10
    },
    input:{
        width: 40,
        height: 50,
        fontSize: 22,
        fontWeight: '700',
        color: themeColor.grey1,
        paddingHorizontal: 5,
        textAlign: 'center'
    }
})