import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#CAA2FE',
        tabBarInactiveTintColor: 'black',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerShadowVisible: false,
        headerTintColor: 'black',
        tabBarStyle: {
          backgroundColor: '#fff',
          paddingTop: 10,
        },
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',

          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              size={24}
              color={color}
              name={focused ? 'heart' : 'hearto'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='Conversations'
        options={{
          title: 'Conversations',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={
                focused ? 'message-reply-text' : 'message-reply-text-outline'
              }
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
