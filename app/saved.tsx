import { Text, View, FlatList, StyleSheet, Button, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import OpenAI from "openai";

//const api_key = 'sk-proj-RRaU29oFQPBxdrQ8A315T3BlbkFJ7LwKTCwpE1CRw1LohoIj';

const api_key = null;

const openai = new OpenAI({apiKey: api_key});

const RecipeDisplayItem = ({recipe}) => {
  return (
    <View style={{ width: '90%', backgroundColor: 'lightgray', marginBottom: 10, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{recipe.name}</Text>
      <Image source={{ uri: recipe.picture }} style={{ width: '100%', height: 200 }} />
      {/*<Text>Ingredients: {recipe.ingredients.join(', ')}</Text>*/}
      <Text>Time: {recipe.time}</Text>
      <Text>Allergens: {recipe.allergens.join(', ')}</Text>
      {/*<Text>Instructions: {recipe.instructions}</Text>*/}
      <TouchableOpacity
        style={{ backgroundColor: 'green', padding: 8, alignItems: 'center', borderRadius: 5 }}
        onPress={() => {
          // Handle button press here
        }}
      >
        <Text style={{ color: 'white' }}>Show Recipe</Text>
      </TouchableOpacity>
    </View>
  )
}

const generateRecipeItem = ({ingredients}) => {
  
}

const generatePictureByName = async name => {
  console.log("generating picture!!!");
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: name,
    n: 1,
    size: "1024x1024",
  })
  const url = response.data[0].url;
  console.log(url);
  return url;
}

const fixPicture = async recipe => {
  if (recipe.picture !== '') {
    return recipe;
  } else {
    try {
      const newPicture = await generatePictureByName(recipe.name);
      return {
        ...recipe,
        picture: newPicture
      };
    } catch (error) {
      console.error(`Failed to generate picture for ${recipe.name}: ${error}`);
      //return recipe; // Return the original recipe if picture generation fails
      return recipe;
    }
  }
}

export default function Recipes() {
  //const [recipesList, setRecipesList] = useState([]);

  const [recipesList, setRecipesList] = useState([
    {
      name: 'Fetuccine alfredo',
      picture: '',
      ingredients: ['ingredient 1', 'ingredient 2'],
      time: '30 minutes',
      allergens: ['allergen 1', 'allergen 2'],
      instructions: 'Instructions for Recipe 1'
    },
    {
      name: 'pot stickers',
      picture: '',
      ingredients: ['ingredient 3', 'ingredient 4'],
      time: '45 minutes',
      allergens: ['allergen 3', 'allergen 4'],
      instructions: 'Instructions for Recipe 2'
    },
    // Add more recipes here
  ]);

  const updatePictures = async () => {
    try {
      const updatedRecipesList = await Promise.all(recipesList.map(fixPicture));
      setRecipesList(updatedRecipesList);
    } catch (error) {
      console.error(`Failed to update pictures: ${error}`);
    }
  };

  useEffect(() => {
    updatePictures();
  }, []); // Empty dependency array means this effect runs once on mount


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    /*<ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {recipesList.map((recipe, index) => (
        <RecipeDisplayItem key={index} recipe={recipe} />
      ))}
    </ScrollView>*/

    
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
