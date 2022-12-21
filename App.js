//initial flow
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./src/screens/Home.js";
import Search from "./src/screens/Search.js";
import Menus from "./src/screens/Menu.js";
import Basket from "./src/screens/Basket";
import AccountStacks from "./src/stacks/AccountArena.js";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = new createNativeStackNavigator();
import Index from "./src/screens/Index";
import SignIn from "./src/screens/Signin";
import SignUp from "./src/screens/Signup";
import Checkout from "./src/screens/Checkout.js";
import Profile from "./src/screens/Profile.js";
import Detail from "./src/screens/Detail";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="grid-outline" color={color} size={20} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="person-circle-outline" color={color} size={20} />
          ),
        }}
      />

      <Tab.Screen
        name="Basket"
        component={Basket}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cart-outline" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff",
  },
};
export default function App() {
  return (
    <SafeAreaView style={[s.fl1, Platform.OS === "android" && s.mgtp30]}>
      <NavigationContainer theme={MyTheme}>
        {/* <MyTabs /> */}
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Index"
        >
          <Stack.Screen name="MyTabs" component={MyTabs} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Menus" component={Menus} />
          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  fl1: { flex: 1 },
  mgtp30: { marginTop: 30 },
});

{
  /* <SafeAreaView style={[s.fl1]}>
          <Text>Hekki</Text>
        <StatusBar style="auto" />
      </SafeAreaView> */
}
