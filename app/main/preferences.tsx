import { Text, View, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import RoundedButton from '@/components/RoundedButton';

const dietary = ['All', 'Vegan', 'Vegetarian', 'Pescetarian', 'Gluten Free', 'Dairy Free', 'Ketogenic', 'Paleolithic', 'Nut Free', 'Fish Free' /* etc. */];

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
  );
}
