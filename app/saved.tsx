import { Text, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import RoundedButton from '@/components/RoundedButton';
import React, { useState, useEffect } from "react";
import { useNavigation } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { Image } from "react-native";



export default function Saved() {


  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params;

  const RecipeDisplayItem = ({recipe}) => {
    return (
      <View style={{ 
        width: '90%', 
        backgroundColor: '#F5F5F5', 
        marginBottom: 20, 
        padding: 20, 
        borderRadius: 10, 
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <Text style={{ fontSize: 24, fontFamily: 'Inter-Bold', marginBottom: 10 }}>{recipe.name}</Text>
        <Image source={{ uri: recipe.picture }} style={{ width: '100%', height: 200, borderRadius: 10 }} />
        <Text style={{ marginTop: 10, fontFamily: 'Inter-Regular' }}>Time: {recipe.time}</Text>
        <Text style={{ marginTop: 5, fontFamily: 'Inter-Regular' }}>Allergens: {recipe.allergens.join(', ')}</Text>
        <View style = {{ marginTop: 10, width: '100%', alignItems: 'center' }}>
          <RoundedButton title="Show Recipe" onPress={() => navigation.navigate("recipe-expansion", {recipeItem: recipe})}/>
        </View>
      </View>
    )
  }

const [recipesList, setRecipesList] = useState([
    // Add more recipes here
    {
      name: 'Fetuccine alfredo',
      picture: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg',
      ingredients: ['ingredient 1', 'ingredient 2'],
      time: '30 minutes',
      allergens: ['allergen 1', 'allergen 2'],
      instructions: 'Instructions for Recipe 1'
    },
    {
      name: 'Fetuccine alfredo',
      picture: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg',
      ingredients: ['ingredient 1', 'ingredient 2'],
      time: '30 minutes',
      allergens: ['allergen 1', 'allergen 2'],
      instructions: 'Instructions for Recipe 1'
    }
  ]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
    

    return (
    // ...
    <FlatList
      data={recipesList}
      keyExtractor={(item, index) => index.toString()} // Add a key extractor
      renderItem={({ item }) => (
        <View style={styles.container}>
          <RecipeDisplayItem recipe={item} />
        </View>
      )}
    />
    );
   }