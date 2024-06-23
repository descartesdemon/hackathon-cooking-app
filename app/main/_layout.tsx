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
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    {/* Optionally configure static options outside the route.*/}
    <Stack.Screen name="start" options={{}}/>
  </Stack>
  );
}
