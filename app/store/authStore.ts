import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/apiClient';
import endpoints from '../api/endpoints';
import { router } from 'expo-router';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const updateAuthHeader = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.post(endpoints.LOGIN, credentials);
          const { user, token } = response.data;

          updateAuthHeader(token);
          set({ user, token, isLoading: false });
          router.push('/(tabs)');
        } catch (error) {
          const errorMessage =
            (error as any)?.response?.data?.message || 'Login failed';
          set({ error: errorMessage, isLoading: false });
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiClient.post(endpoints.REGISTER, data);
          const { user, token } = response.data;

          updateAuthHeader(token);
          set({ user, token, isLoading: false });
          router.push('/(tabs)');
        } catch (error) {
          const errorMessage =
            (error as any)?.response?.data?.message || 'Registration failed';
          set({ error: errorMessage, isLoading: false });
        }
      },

      logout: () => {
        updateAuthHeader(null);
        set({ user: null, token: null });
        router.push('/(auth)/login');
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          updateAuthHeader(state.token);
        }
      },
    }
  )
);
