import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { getApps, initializeApp } from "firebase/app";
import Add_edit_Car from "./components/Add_edit_Car";

const firebaseConfig = {
  apiKey: "AIzaSyCLRbQdp6oSPbiceBcR1JlrYQmIBGb52_0",
  authDomain: "inno-95b61.firebaseapp.com",
  projectId: "inno-95b61",
  storageBucket: "inno-95b61.appspot.com",
  messagingSenderId: "1043791623724",
  appId: "1:1043791623724:web:fb40e9d8ceb06df9abc389",
};

if (getApps().length < 1) {
  initializeApp(firebaseConfig);
  console.log("Firebase On!");
}

export default function App() {
  // Initialize Firebase
  useEffect(() => {
    if (!getApps().length) {
      initializeApp(firebaseConfig);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Add_edit_Car />
    </View>
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
