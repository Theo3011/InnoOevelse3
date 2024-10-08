// basics import
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { getApps, initializeApp } from "firebase/app";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

// Komponenter for skærme
import CarList from "./components/CarList";
import CarDetails from "./components/CarDetails";
import AddEditCar from "./components/Add_edit_Car";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCLRbQdp6oSPbiceBcR1JlrYQmIBGb52_0",
  authDomain: "inno-95b61.firebaseapp.com",
  projectId: "inno-95b61",
  storageBucket: "inno-95b61.appspot.com",
  messagingSenderId: "1043791623724",
  appId: "1:1043791623724:web:fb40e9d8ceb06df9abc389",
  databaseURL:
    "https://inno-95b61-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
if (getApps().length < 1) {
  initializeApp(firebaseConfig);
  console.log("Firebase On!");
}

//Stack Navigator
const Stack = createStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="CarList">
      <Stack.Screen name="CarList" component={CarList} />
      <Stack.Screen name="CarDetails" component={CarDetails} />
      <Stack.Screen name="Edit Car" component={AddEditCar} />
    </Stack.Navigator>
  );
};

// Opret Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={StackNavigation}
          options={{
            tabBarIcon: () => <Ionicons name="home" size={20} />,
            headerShown: null,
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddEditCar}
          options={{
            tabBarIcon: () => <Ionicons name="add" size={20} />,
            headerShown: null,
          }}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
