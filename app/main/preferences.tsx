import { Text, View, ScrollView, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import RoundedButton from '@/components/RoundedButton';

const dietary = ['Vegan', 'Vegetarian', 'Pescetarian', 'Gluten Free', 'Dairy Free', 'Ketogenic', 'Paleolithic', 'Nut Free', 'Fish Free' /* etc. */];



export default function Preferences() {
  const [text, setText] = useState("");

  const OptionsBox = ({options}) => {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
        {options.map((option, index) => (
          <RoundedButton key={index} title={option} containerStyle = {{width: (option.length * 12),
            height: 50,
            marginHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 1}}
          onPress={() => setText(text + option + ", ")} />
        ))}
      </View>
    );
  }
  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
    
    <Text style = {{ fontFamily: 'Inter-Regular', fontSize: 12, color: "black" }}>Write your preferences or select them from below!</Text>

    <TextInput
  style={{ 
    height: 70, 
    borderColor: 'gray', 
    borderWidth: 1, 
    width: '80%', 
    marginTop: 20, 
    fontFamily: 'Inter-Regular',
    paddingLeft: 10 // Add this line
  }}
  onChangeText={setText}
  value={text}
  placeholder="Enter list of items"
  multiline={true}
  returnKeyType="none"
/>



  <View style={{marginTop : 20}}/>

    <OptionsBox options = {dietary} />

    </ScrollView>
  );
}
