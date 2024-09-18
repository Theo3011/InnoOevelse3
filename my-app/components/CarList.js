import React, { useState, useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native"; // Tilføjet StyleSheet import
import { getDatabase, ref, onValue, off } from "firebase/database";

// Funktion til CarList komponenten
const CarList = ({ navigation }) => {
  const [cars, setCars] = useState(null);

  // useEffect til at hente data fra Firebase Realtime Database
  useEffect(() => {
    const db = getDatabase();
    const carsRef = ref(db, "Cars");

    // Lytter på ændringer i 'Cars' node
    const unsubscribe = onValue(carsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCars(data);
      }
    });

    // Cleanup: fjern listeneren når komponenten unmountes
    return () => {
      unsubscribe();
    };
  }, []);

  // Vis Loading tekst, hvis der ikke er data
  if (!cars) {
    return <Text>Loading...</Text>;
  }

  // Funktion til at håndtere valg af bil
  const handleSelectCar = (id) => {
    // Find bil objektet baseret på ID og naviger til Car Details skærmen
    const car = Object.entries(cars).find(([key]) => key === id);
    navigation.navigate("CarDetails", { car });
  };

  // Konverter car objektet til arrays
  const carArray = Object.values(cars);
  const carKeys = Object.keys(cars);

  // Render FlatList med bilinformationer
  return (
    <FlatList
      data={carArray}
      keyExtractor={(item, index) => carKeys[index]}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={styles.container}
          onPress={() => handleSelectCar(carKeys[index])}
        >
          <Text>
            {item.brand} {item.model}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

// Styles for komponenten
const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default CarList;
