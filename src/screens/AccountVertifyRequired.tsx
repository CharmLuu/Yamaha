import React, {useState} from "react";
import {ScrollView, StyleSheet, Text, TextInput, View, Button, Platform} from "react-native";
import {styleForm, stylePadding} from "../theme";
import {themeColor} from "../theme/color";

export default function AccountVertifyRequired() {

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
                />
                <TextInput
                    style={[styleForm.input, styles.input]}
                />
                <TextInput
                    style={[styleForm.input, styles.input]}
                />
                <TextInput
                    style={[styleForm.input, styles.input]}
                />
            </View>
            {/*<Button title="Open" onPress={() => setOpen(true)} />*/}
            {/*<DatePicker*/}
            {/*    modal*/}
            {/*    open={open}*/}
            {/*    date={date}*/}
            {/*    onConfirm={(date) => {*/}
            {/*        setOpen(false)*/}
            {/*        setDate(date)*/}
            {/*    }}*/}
            {/*    onCancel={() => {*/}
            {/*        setOpen(false)*/}
            {/*    }}*/}
            {/*/>*/}
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