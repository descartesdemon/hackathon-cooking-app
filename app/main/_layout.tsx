import {Stack} from "expo-router"
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  //const [preferences, setPreferences] = useState(0);

  
  return (
    <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: '#E0E0E0', // Slightly darker shade of white
      },
      headerTintColor: '#333', // Dark color for the text
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    {/* Optionally configure static options outside the route.*/}
    <Stack.Screen name="start" options={{title: 'Start'}}/>
    <Stack.Screen name="camera" options={{title: 'Camera'}}/>
    <Stack.Screen name="preferences" options={{title: 'Preferences'}}/>
    <Stack.Screen name="recipes" options={{title: 'Recipes'}}/>
    <Stack.Screen name="recipe-expansion" options={{title: 'Recipe'}}/>{/*Use context to change title in future */}
  </Stack>
  );
}
