import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from '../components/button/Button';

export default function Index() {
  return (
    <View style={styles.container}>
      <Button
        label='Upload conversation'
        onPress={() => router.push('/UploadConv')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
