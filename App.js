import "react-native-gesture-handler"
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Login from "./src/Login";
import Dashboard from "./src/Dashboard";
import Detail from "./src/Detail"


const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown:false}}
        />

    <Stack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown:false}}
        />

    <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown:false}}
        />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
