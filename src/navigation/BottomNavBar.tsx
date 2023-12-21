import React from 'react'
import {Text} from 'react-native'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Home from "../screens/Home";
import Login from "../screens/Login";
import {themeColor} from "../theme/color";
import Menu from "../screens/Menu";
import i18n from "../utils/i18n";
import {IS_LOGGED_IN} from "../data/queries/isLoggedIn";
import {useQuery} from "@apollo/client";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator()

export default function BottomNavBar() {
    const { data } = useQuery(IS_LOGGED_IN);
  return (
      <Tab.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: themeColor.theme,
          }}
      >
        <Tab.Screen
            name="Menu"
            component={Menu}
            options={{
              tabBarLabel: `${i18n.t("menu")}`,
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="view-headline" color={color} size={size} />
              ),
            }}
        />
        <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: `${i18n.t("home")}`,
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
        />
        <Tab.Screen
            name="Account"
            component={data?.isLoggedIn ? Profile : Login}
            options={{
              tabBarLabel: `${i18n.t("myAccount")}`,
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account-outline" color={color} size={size} />
              ),
            }}
        />
      </Tab.Navigator>
  )
}
