import { Tabs } from 'expo-router';
import {React, useState} from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  //const [preferences, setPreferences] = useState(0);

  return (
    <Tabs
      initialRouteName = "main"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen //This hides the index redirect from the tab bar
        name="index"
        options={{
          href: null,
        }}
        
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'magnifying-glass' : 'magnifying-glass'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="main"
        options={{
          title: 'Cook',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'kitchen-set' : 'kitchen-set'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'bookmark' : 'bookmark'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
