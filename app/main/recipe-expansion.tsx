import { useNavigation } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { Text, ScrollView, Image, View} from "react-native";
import React, { useState, useEffect } from "react";


export default function RecipeExpansion() {
  const [recipeItem, setItem] = useState({
    name: 'Fetuccine alfredo',
    picture: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg',
    ingredients: ['ingredient 1', 'ingredient 2'],
    time: '30 minutes',
    allergens: ['allergen 1', 'allergen 2'],
    instructions: 'Instructions for Recipe 1'
  });

  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params;

  useEffect(() => {
    if (params) {
      if(params.recipeItem) {
        setItem(params.recipeItem);
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
  <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 10 }}>
    <Text style={{ fontFamily: 'Inter-Black', fontSize: 32, color: "black" }}>{recipeItem.name}</Text>
    <Image source={{ uri: recipeItem.picture }} style={{ width: 200, height: 200 }} />
    <Text>{recipeItem.allergens ? recipeItem.allergens.join(', ') : ""}</Text>
    <Text>{recipeItem.time}</Text>
    <Text style={{ fontFamily: 'Inter-Black', fontSize: 24, color: "black" }}>Ingredients</Text>
    {recipeItem.ingredients.map((ingredient, index) => (
  <Text key={index}>• {ingredient}</Text>
))}
    <Text style={{ fontFamily: 'Inter-Black', fontSize: 24, color: "black" }}>Instructions</Text>
    <Text>{recipeItem.instructions}</Text>
  </ScrollView>
  );
}
