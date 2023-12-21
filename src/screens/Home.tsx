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
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home() {
    // const { data } = useQuery(IS_LOGGED_IN);
    // console.log(data?.isLoggedIn)

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = ({type}, selectedDate) => {
        if(type == "set"){
            const currentDate = selectedDate;
            setDate(currentDate);

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


  return (
    <View style={[stylePadding.pxBase, stylePadding.pyBase]}>
        <View>
            {/*<View style={styles.dateText}>*/}
            {/*    <Text>{date.toLocaleDateString()}</Text>*/}
            {/*</View>*/}
            <Text className="text-red-600">HomeScreen</Text>
            <Pressable
                onPress={toggleDatePicker}
                style={styles.btnDate}
            >
                <View style={styles.wrapInput}>
                    {!show && (
                        <TextInput
                            placeholder='Date of Birth'
                            value={formatDate(date)}
                            style={[styles.input]}
                            editable={false}
                            onChangeText={setDate}
                        />
                    )}
                </View>
                <MaterialCommunityIcons name="calendar-month-outline" size={22} />
            </Pressable>
        </View>
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
            <View className="flex-row gap-4">
                <Pressable
                    className="border border-gray-400 h-10 items-center justify-center w-40 rounded-[20px]"
                    onPress={toggleDatePicker}
                >
                    <Text>Cancel</Text>
                </Pressable>
                <Pressable
                    className="bg-red-300 h-10 items-center justify-center w-40 rounded-[20px]"
                    onPress={confirmIosDate}
                >
                    <Text>Confirm</Text>
                </Pressable>
            </View>
        )}
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