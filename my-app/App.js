import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { getApps, initializeApp } from "firebase/app";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons"; // Importer Ionicons

// Komponenter for dine skærme
import CarList from "./components/CarList";
import CarDetails from "./components/CarDetails";
import Add_edit_Car from "./components/Add_edit_Car";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCLRbQdp6oSPbiceBcR1JlrYQmIBGb52_0",
  authDomain: "inno-95b61.firebaseapp.com",
  projectId: "inno-95b61",
  storageBucket: "inno-95b61.appspot.com",
  messagingSenderId: "1043791623724",
  appId: "1:1043791623724:web:fb40e9d8ceb06df9abc389",
};

export default function App() {
  // Initialize Firebase
  useEffect(() => {
    if (getApps().length < 1) {
      initializeApp(firebaseConfig);
      console.log("Firebase On!");
    }
  }, []);

  // Opret Stack Navigator
  const Stack = createStackNavigator();
  const StackNavigation = () => {
    return (
      <Stack.Navigator initialRouteName="CarList">
        <Stack.Screen name="CarList" component={CarList} />
        <Stack.Screen name="CarDetails" component={CarDetails} />
        <Stack.Screen name="Add_edit_Car" component={Add_edit_Car} />
      </Stack.Navigator>
    );
  };

  // Opret Tab Navigator
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Home Tab med StackNavigation */}
        <Tab.Screen
          name="CarList"
          component={StackNavigation}
          options={{
            tabBarIcon: () => <Ionicons name="home" size={20} />,
            headerShown: null,
          }}
        />
        {/* Add Tab med Add_edit_Car */}
        <Tab.Screen
          name="Add"
          component={Add_edit_Car}
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
