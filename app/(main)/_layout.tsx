import { Stack } from 'expo-router';
import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/back-button/BackButton';
import CustomHeader from '../components/custom-header/CustomHeader';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='UploadConv'
        options={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name='Analysis'
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: '',
          headerLeft: () => (
            <CustomHeader
              title='Conversation Analysis'
              iconName='chatbubbles'
            />
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  analyzeHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 1,
    width: '100%',
  },
  analyzeHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: '#030303',
    marginLeft: 8,
  },
});
