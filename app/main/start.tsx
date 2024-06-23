import { useNavigation } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { Text, ScrollView, View, TextInput, Button, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Colors } from '@/constants/Colors';
import React, { useState, useEffect } from "react";

const cuisines = ['Mexican', 'Chinese', 'Italian', 'Indian', 'Thai', 'French', 'Russian', 'German' /* etc. */];

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
      setText(params.ingredients);
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
        <Text style = {{ fontFamily: 'Inter-Variable', fontSize: 32, color: "black" }}></Text>
        <TextInput
        style={{ height: 70, borderColor: 'gray', borderWidth: 1, width: '80%', marginTop: 20 }}
        onChangeText={setText}
        value={text}
        placeholder="Enter list of items"
        multiline={true}
        returnKeyType="none"
      />
        <View style={{ marginTop: 20, width: '80%', backgroundColor: 'green' }}>
          <Button
            title="Scan Ingredients"
            color="#fff"
            onPress={() => navigation.navigate('camera')}
          />
        </View>

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
      </View>

        <View style={{ marginTop: 20, width: '80%', backgroundColor: 'green' }}>
          <Button
            title="Show Recipes"
            color="#fff"
            onPress={() => navigation.navigate('recipes')}
          />
        </View>

        <View style={{ marginTop: 20, width: '80%', backgroundColor: 'green' }}>
          <Button
            title="Preferences"
            color="#fff"
            onPress={() => navigation.navigate('preferences')}
          />
        </View>
        {/*
        <TouchableOpacity onPress={() => console.log('test')} style={{ marginTop: 20 }}>
          <Text style={{ color: 'blue' }}>Type your ingredients instead...</Text>
        </TouchableOpacity>
      */}
      {/*</View>*/}
      </ScrollView>
  );
}
