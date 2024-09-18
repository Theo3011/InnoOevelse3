import React from "react";
import { View, Text, Button } from "react-native";

const CarList = ({ navigation }) => {
  return (
    <View>
      <Text>Car List Screen</Text>
      <Button
        title="Go to Car Details"
        onPress={() => navigation.navigate("CarDetails")}
      />
    </View>
  );
};

export default CarList;
