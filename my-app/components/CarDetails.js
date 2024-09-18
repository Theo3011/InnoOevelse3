import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, Platform, StyleSheet } from "react-native";
import { getDatabase, ref, remove } from "firebase/database";

const CarDetails = ({ navigation, route }) => {
    const [car, setCar] = useState({});

    useEffect(() => {
        setCar(route.params.car[1]);

        return () => {
            setCar({});
        };
    }, [route.params.car]);

    const handleEdit = () => {
        const car = route.params.car;
        navigation.navigate('Edit Car', { car });
    };

    const confirmDelete = () => {
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
            Alert.alert('Are you sure?', 'Do you want to delete the car?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    const handleDelete = async () => {
        const id = route.params.car[0];
        const db = getDatabase();
        const carRef = ref(db, `Cars/${id}`);
        
        try {
            await remove(carRef);
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    if (!car) {
        return <Text>No data</Text>;
    }

    return (
        <View style={styles.container}>
            {Object.entries(car).map((item, index) => (
                <View style={styles.row} key={index}>
                    <Text style={styles.label}>{item[0]}</Text>
                    <Text style={styles.value}>{item[1]}</Text>
                </View>
            ))}
            <Button title="Edit" onPress={handleEdit} />
            <Button title="Delete" onPress={confirmDelete} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        marginVertical: 8,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    value: {
        flex: 1,
    },
});

export default CarDetails;
