import { Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import OpenAI from "openai";

const api_key = 'sk-proj-RRaU29oFQPBxdrQ8A315T3BlbkFJ7LwKTCwpE1CRw1LohoIj';

const openai = new OpenAI({apiKey: api_key});

const RecipeDisplayItem = ({recipe}) => {
  return (
    <View style={{ width: '90%', backgroundColor: 'lightgray', marginBottom: 10, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{recipe.name}</Text>
      <Image source={{ uri: recipe.picture }} style={{ width: '100%', height: 200 }} />
      <Text>Ingredients: {recipe.ingredients.join(', ')}</Text>
      <Text>Time: {recipe.time}</Text>
      <Text>Allergens: {recipe.allergens.join(', ')}</Text>
      <Text>Instructions: {recipe.instructions}</Text>
    </View>
  )
}

export default function Recipes() {
  //const [recipesList, setRecipesList] = useState([]);

  const [recipesList, setRecipesList] = useState([
    {
      name: 'Recipe 1',
      picture: '',
      ingredients: ['ingredient 1', 'ingredient 2'],
      time: '30 minutes',
      allergens: ['allergen 1', 'allergen 2'],
      instructions: 'Instructions for Recipe 1'
    },
    {
      name: 'Recipe 2',
      picture: '',
      ingredients: ['ingredient 3', 'ingredient 4'],
      time: '45 minutes',
      allergens: ['allergen 3', 'allergen 4'],
      instructions: 'Instructions for Recipe 2'
    },
    // Add more recipes here
  ]);

  const fixPicture = recipe => {
    if (recipe.picture !== '') {
      return recipe;
    } else {
      return {
        ...recipe,
        picture: recipe.name
      };
    }
  }

  const updatePictures = () => {
    const updatedRecipesList = recipesList.map(recipe => ({
      ...recipe,
      picture: '123'
    }));
  
    setRecipesList(updatedRecipesList);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {recipesList.map((recipe, index) => (
        <RecipeDisplayItem key={index} recipe={recipe} />
      ))}
    </ScrollView>
  );
}
