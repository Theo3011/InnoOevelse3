import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import { getDatabase, ref, push, update } from "firebase/database";

// Henter navigation og route fra props
const Add_edit_Car = ({ navigation, route }) => {
  const db = getDatabase();

  const initialState = {
    brand: "",
    model: "",
    year: "",
    licensePlate: "",
  };

  const [newCar, setNewCar] = useState(initialState);

  // Returnere true, hvis vi er på edit car
  const isEditCar = route.name === "Edit Car";

  useEffect(() => {
    if (isEditCar && route.params && route.params.car) {
      const car = route.params.car[1];
      setNewCar(car);
    }

    // Clean up when we leave the screen
    return () => {
      setNewCar(initialState);
    };
  }, [isEditCar, route.params]);

  const changeTextInput = (name, event) => {
    setNewCar({ ...newCar, [name]: event });
  };

  const handleSave = async () => {
    const { brand, model, year, licensePlate } = newCar;

    if (
      brand.length === 0 ||
      model.length === 0 ||
      year.length === 0 ||
      licensePlate.length === 0
    ) {
      return Alert.alert("Et af felterne er tomme!");
    }

    try {
      if (isEditCar) {
        const id = route.params.car[0];
        const carRef = ref(db, `Cars/${id}`);

        const updatedFields = {
          brand,
          model,
          year,
          licensePlate,
        };

        await update(carRef, updatedFields);
        Alert.alert("Din info er nu opdateret");
        navigation.navigate("CarDetails", { car: newCar });
      } else {
        const carsRef = ref(db, "/Cars/");
        const newCarData = {
          brand,
          model,
          year,
          licensePlate,
        };

        await push(carsRef, newCarData);
        Alert.alert("Saved");
        setNewCar(initialState);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {Object.keys(initialState).map((key, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.label}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
            <TextInput
              value={newCar[key]}
              onChangeText={(event) => changeTextInput(key, event)}
              style={styles.input}
              placeholder={`Enter ${key}`}
            />
          </View>
        ))}
        <Button
          title={isEditCar ? "Save changes" : "Add car"}
          onPress={handleSave}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  row: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default Add_edit_Car;
