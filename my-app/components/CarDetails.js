import React from "react";
import { View, Text, Button } from "react-native";

const CarDetails = ({ navigation }) => {
  return (
    <View>
      <Text>Car Details Screen</Text>
      <Button
        title="Edit Car"
        onPress={() => navigation.navigate("Add_edit_Car")}
      />
    </View>
  );
};

export default CarDetails;
