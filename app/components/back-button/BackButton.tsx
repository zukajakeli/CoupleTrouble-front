import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

type Props = {
  onPress?: () => void;
};

const BackButton = ({ onPress }: Props) => {
  const router = useRouter();
  return (
    <Pressable onPress={onPress ? onPress : () => router.back()}>
      <Ionicons name='arrow-back-outline' size={24} color='black' />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
