import { Text, View, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";

const dietary = ['All', 'Vegan', 'Vegetarian', 'Pescetarian', 'Gluten Free', 'Dairy Free', 'Ketogenic', 'Paleolithic', 'Nut Free', 'Fish Free' /* etc. */];

const cuisineStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkBackground: {
    marginTop: 10,
    width: '90%',
    backgroundColor: '#DDDDDD', // Slightly darker background
    padding: 10,
    marginBottom: -10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center', // Add this line
  },
  button: {
    margin: 2,
    backgroundColor: '#74992e',
  },
});

const renderButton = ({ item }) => (
  <View style={cuisineStyles.buttonContainer}>
    <Button
      title={item}
      color="#fff"
      onPress={() => console.log(`${item} button pressed`)} // Replace with your own function
    />
  </View>
);

export default function Preferences() {
  const [text, setText] = useState("");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>What's your preference?</Text>

      <View style={cuisineStyles.darkBackground}>
      <View style={cuisineStyles.buttonContainer}>
      {dietary.map((diet) => (
        <View style={cuisineStyles.button} key={diet}>
          <Button
            title={diet}
            color="#fff"
            onPress={() => console.log(`${diet} button pressed`)} // Replace with your own function
          />
        </View>
      ))}
      </View>
      </View>
    
    </View>
  );
}
