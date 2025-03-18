import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { useAuthStore } from '../store/authStore';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { register, isLoading, error, clearError } = useAuthStore();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');
    await register({ name, email, password });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>

          {error && <Text style={styles.error}>{error}</Text>}
          {passwordError && <Text style={styles.error}>{passwordError}</Text>}

          <TextInput
            label='Full Name'
            value={name}
            onChangeText={(text) => {
              clearError();
              setName(text);
            }}
            mode='outlined'
            style={styles.input}
          />

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
              setPasswordError('');
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

          <TextInput
            label='Confirm Password'
            value={confirmPassword}
            onChangeText={(text) => {
              setPasswordError('');
              setConfirmPassword(text);
            }}
            secureTextEntry={!showPassword}
            mode='outlined'
            style={styles.input}
          />

          <Button
            mode='contained'
            onPress={handleRegister}
            style={styles.button}
            loading={isLoading}
            disabled={!name || !email || !password || !confirmPassword}>
            Register
          </Button>

          <TouchableOpacity
            onPress={() => router.push('/(auth)/login')}
            style={styles.linkContainer}>
            <Text style={styles.link}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
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
