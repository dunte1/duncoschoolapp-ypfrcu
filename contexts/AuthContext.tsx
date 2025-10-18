
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginCredentials, AuthState, UserRole } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = '@dunco_auth_token';
const USER_DATA_KEY = '@dunco_user_data';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);

      if (token && userData) {
        const user = JSON.parse(userData);
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      console.log('Error checking auth status:', error);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Failed to check authentication status',
      });
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      // Simulate API call - Replace with actual API integration
      const response = await fetch('https://multischool.duncowebsolutions.co.ke/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      const user: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role as UserRole,
        avatar: data.user.avatar,
        phone: data.user.phone,
        token: data.token,
      };

      await AsyncStorage.setItem(AUTH_TOKEN_KEY, data.token);
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.log('Login error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Invalid credentials. Please try again.',
      }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      await AsyncStorage.removeItem(USER_DATA_KEY);

      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const updateUser = (user: User) => {
    setState(prev => ({ ...prev, user }));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
