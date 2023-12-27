import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import BottomNavBar from "./BottomNavBar";
import {Image, TouchableOpacity} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Register from "../screens/Register";
import ForgotPassword from "../screens/ForgotPassword";
import AccountVertifyRequired from "../screens/AccountVertifyRequired";
import Category from "../screens/Category";
import ProductDetail from "../screens/ProductDetail";

const Stack = createNativeStackNavigator();

const LogoTitle = () =>{
    return (
        <TouchableOpacity style={{
            paddingVertical: 5
        }}>
            <Image
                style={{ width: 100, height: 40 }}
                source={require('../images/logo.png')}
            />
        </TouchableOpacity>
    );
}

const optionHeader = {
    headerTitle: (props) => <LogoTitle {...props} />,
    headerRight: () => (
        <TouchableOpacity>
            <MaterialCommunityIcons
                name="cart-outline"
                size={24}
            />
        </TouchableOpacity>
    ),
    headerLeft: () => (
        <TouchableOpacity>
            <MaterialCommunityIcons
                name="view-headline"
                size={24}
            />
        </TouchableOpacity>
    )
}


export default function StackNavigator() {
  return (
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen
            name="Main"
            component={BottomNavBar}
            options={optionHeader}
        />
        <Stack.Screen
            name="Register"
            component={Register}
        />
        <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
        />
        <Stack.Screen
            name="AccountVertifyRequired"
            component={AccountVertifyRequired}
        />
        <Stack.Screen
            name="Category"
            component={Category}
        />
        <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
        />
      </Stack.Navigator>
  )
}
