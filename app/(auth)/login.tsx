import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { useAuthStore } from '../store/authStore';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuthStore();

  const handleLogin = async () => {
    await login({ email, password });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome Back</Text>

        {error && <Text style={styles.error}>{error}</Text>}

        <TextInput
          label='Email'
          value={email}
          onChangeText={(text) => {
            clearError();
            setEmail(text);
          }}
          mode='outlined'
          keyboardType='email-address'
          autoCapitalize='none'
          style={styles.input}
        />

        <TextInput
          label='Password'
          value={password}
          onChangeText={(text) => {
            clearError();
            setPassword(text);
          }}
          secureTextEntry={!showPassword}
          mode='outlined'
          style={styles.input}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        <Button
          mode='contained'
          onPress={handleLogin}
          style={styles.button}
          loading={isLoading}
          disabled={!email || !password}>
          Login
        </Button>

        <TouchableOpacity
          onPress={() => router.push('/(auth)/register')}
          style={styles.linkContainer}>
          <Text style={styles.link}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  linkContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  link: {
    color: '#2196F3',
    fontSize: 16,
  },
});
