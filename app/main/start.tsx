import { useNavigation } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { Text, ScrollView, View, TextInput, Button, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RoundedButton from '@/components/RoundedButton';

/*const cuisines = ['Mexican', 'Chinese', 'Italian', 'Indian', 'Thai', 'French', 'Russian', 'German'];

const cuisineStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkBackground: {
    marginTop: 10,
    width: '90%',
    backgroundColor: 'BBBBBB', // Slightly darker background
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
    backgroundColor: 'blue',
  },
}); */
/*
const renderButton = ({ item }) => (
  <View style={cuisineStyles.buttonContainer}>
    <Button
      title={item}
      color="#fff"
      onPress={() => console.log(`${item} button pressed`)} // Replace with your own function
    />
  </View>
);*/

export default function Start() {
  const [text, setText] = useState("");

  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params;

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    console.log
    console.log(params);
    if (params) {
      if (params.ingredients) {
        setText(params.ingredients);
      }
      if (params.preferences) {
        AsyncStorage.setItem("preferences", JSON.stringify(params.preferences));
      }
    }
  }, [route]);

  return (
      /*<View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >*/
  <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style = {{ fontFamily: 'Inter-Bold', fontSize: 32, color: "black" }}>What's in your fridge?</Text>
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
      {/*
      <Button
        title="Scan Ingredients"
        color="#fff"
        onPress={() => navigation.navigate('camera')}
        style={{ fontFamily: 'Inter-Bold' }}
      />*/}
      <View style={{ marginTop: 20}}></View>
      <RoundedButton title="📸 Scan Ingredients" onPress = {() => navigation.navigate('camera')}/>
    {/*</View>
        <View style={cuisineStyles.darkBackground}>
          <View style={cuisineStyles.buttonContainer}>
          {cuisines.map((cuisine) => (
            <View style={cuisineStyles.button} key={cuisine}>
              <Button
                title={cuisine}
                color="#fff"
                onPress={() => console.log(`${cuisine} button pressed`)} // Replace with your own function
              />
            </View>
          ))}
        </View>
        </View>*/}

        <View style={{ marginTop: 20}}></View>
      <RoundedButton title="📄 Show Recipes" onPress = {() => navigation.navigate('recipes', text.length > 0 ? {ingredients: text} : null)}/>

      <View style={{ marginTop: 20}}></View>
      <RoundedButton title="🧪 Preferences" onPress={() => navigation.navigate('preferences')}/>
        {/*
        <TouchableOpacity onPress={() => console.log('test')} style={{ marginTop: 20 }}>
          <Text style={{ color: 'blue' }}>Type your ingredients instead...</Text>
        </TouchableOpacity>
      */}
      {/*</View>*/}
      </ScrollView>
  );
}
