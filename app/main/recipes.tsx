import { Text, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import RoundedButton from '@/components/RoundedButton';
import React, { useState, useEffect } from "react";
import { useNavigation } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { Image } from "react-native";
import OpenAI from "openai";
import Loading from '@/components/Loading'

const api_key = 'sk-proj-RRaU29oFQPBxdrQ8A315T3BlbkFJ7LwKTCwpE1CRw1LohoIj';

//const api_key = null;

const openai = new OpenAI({apiKey: api_key});



/*const generateRecipeItem = async ({ingredients}) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to output JSON.",
      },
      { role: "user", content: `Generate a JSON object for a recipe for a food item that can be made with ${ingredients} with these specific fields, \{name: (short string), picture: empty string, ingredients: list, time: short alphanumeric string, allergens: list, instructions: long form text with bullet points'\},` },
    ],
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
  });
  return completion.choices[0].message.content;
}*/

const generateRecipeItem = async (food, ingredients) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to output JSON.",
      },
      { role: "user", content: `Generate a JSON object for a recipe for ${food} that can be made with ${ingredients} with these specific fields. \{name: (short string), picture: empty string, ingredients: list in ['a','b','c'] format, time: short alphanumeric string, allergens: list in ['a','b','c'] format, instructions: long form text with bullet points'\},` },
    ],
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
  });
  console.log(JSON.parse(completion.choices[0].message.content));
  return JSON.parse(completion.choices[0].message.content);
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
      return recipe; // Return the original recipe if picture generation fails
    }
  }
}

export default function Recipes() {
  //const [recipesList, setRecipesList] = useState([]);

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

  ]);

  const [loading, setLoading] = useState(false);

  const updatePictures = async () => {
    try {
      const updatedRecipesList = await Promise.all(recipesList.map(fixPicture));
      setRecipesList(updatedRecipesList);
    } catch (error) {
      console.error(`Failed to update pictures: ${error}`);
    }
  };

  /*useEffect(() => {
    updatePictures();
  }, []); // Empty dependency array means this effect runs once on mount*/

  useEffect(() => {
    console.log(recipesList);
    ( async function() {
    if (params) {
      if (params.ingredients) {
        const completion = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant designed to write syntactically valid Javascript lists.",
            },
            { role: "user", content: `Generate a list of exactly 5 distinct foods that can be made using ${params.ingredients} in this format ['Pepperoni Pizza','Chicken Alfredo','Shrimp Fried Rice']` },
          ],
          model: "gpt-3.5-turbo-0125",
        });
        const listOfFoods = eval(completion.choices[0].message.content);
        console.log(`${listOfFoods} list of foods`)
        /* listOfFoods.forEach((food, index) => {
          console.log(`${index} Generating recipe details for ${food}`)
          /*const item = generateRecipeItem(food, params.ingredients);
          item.picture = generatePictureByName(food);
          setRecipesList([...recipesList, item]);
          console.log(recipesList); ///
          const item = generateRecipeItem(foods[index], params.ingredients);
          item.picture = generatePictureByName(foods[index]);
          tempList.push(item);
        }); */
        const promises = listOfFoods.map(async (food) => {
          console.log(`Generating recipe details for ${food}`)
          const item = await generateRecipeItem(food, params.ingredients);
          item.picture = await generatePictureByName(food);
          return item;
        });
        setLoading(true);
        const items = await Promise.all(promises);
        setLoading(false);
        //console.log(`AAAA ${[...recipesList, ...items]}`)
        setRecipesList([...recipesList, ...items]);
      }
    }
  })();
  }, [route]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <>
    <Loading isLoading={loading} />
    <FlatList
      data={recipesList}
      keyExtractor={(item, index) => index.toString()} // Add a key extractor
      renderItem={({ item }) => (
        <View style={styles.container}>
          <RecipeDisplayItem recipe={item} />
        </View>
      )}
    />
    </>
  );
}
