import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { useAuthStore } from '../store/authStore';
import React from 'react';

export default function AuthLayout() {
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      const timer = setTimeout(() => {
        router.replace('/(main)/UploadConv');
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [token]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}
    />
  );
}
