import React from "react";
import {ScrollView, Text, View} from "react-native";
import {stylePadding} from "../theme";
import Form1 from "./AccountVertifyRequired/Form1";
import Form2 from "./AccountVertifyRequired/Form2";


export default function AccountVertifyRequired() {
    return(
        <ScrollView
            contentContainerStyle={{
                paddingVertical: 30,
                paddingHorizontal: 15
            }}
            keyboardShouldPersistTaps='handled'
        >
            <Form1/>

            <View className={"realative text-center items-center my-6"}>
                <View className={"border-b absolute top-[50%] inset-x-0"}></View>
                <Text className={"bg-white px-2"}>OR</Text>
            </View>
            <Form2/>
        </ScrollView>

    )
}

