import { Stack } from 'expo-router';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen
          name='(main)'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name='+not-found' />
      </Stack>
    </PaperProvider>
  );
}
