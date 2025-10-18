
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

// Demo users for testing
const DEMO_USERS = {
  'admin@dunco.com': {
    id: '1',
    name: 'Admin User',
    email: 'admin@dunco.com',
    role: 'admin' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    phone: '+254700000001',
    password: 'admin123',
  },
  'teacher@dunco.com': {
    id: '2',
    name: 'John Teacher',
    email: 'teacher@dunco.com',
    role: 'teacher' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    phone: '+254700000002',
    password: 'teacher123',
  },
  'student@dunco.com': {
    id: '3',
    name: 'Jane Student',
    email: 'student@dunco.com',
    role: 'student' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    phone: '+254700000003',
    password: 'student123',
  },
  'parent@dunco.com': {
    id: '4',
    name: 'Mary Parent',
    email: 'parent@dunco.com',
    role: 'parent' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    phone: '+254700000004',
    password: 'parent123',
  },
  'librarian@dunco.com': {
    id: '5',
    name: 'Bob Librarian',
    email: 'librarian@dunco.com',
    role: 'librarian' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    phone: '+254700000005',
    password: 'librarian123',
  },
  'accountant@dunco.com': {
    id: '6',
    name: 'Alice Accountant',
    email: 'accountant@dunco.com',
    role: 'accountant' as UserRole,
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
    phone: '+254700000006',
    password: 'accountant123',
  },
};

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
      console.log('Checking auth status...');
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);

      console.log('Token exists:', !!token);
      console.log('User data exists:', !!userData);

      if (token && userData) {
        const user = JSON.parse(userData);
        console.log('User authenticated:', user.email);
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        console.log('No auth data found');
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

  const loginWithAPI = async (credentials: LoginCredentials): Promise<User> => {
    console.log('Attempting API login...');
    const response = await fetch('https://multischool.duncowebsolutions.co.ke/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    console.log('API response status:', response.status);

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();
    console.log('API response received');

    return {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role as UserRole,
      avatar: data.user.avatar,
      phone: data.user.phone,
      token: data.token,
    };
  };

  const loginWithDemo = async (credentials: LoginCredentials): Promise<User> => {
    console.log('Using demo login for:', credentials.email);
    
    const demoUser = DEMO_USERS[credentials.email as keyof typeof DEMO_USERS];
    
    if (!demoUser || demoUser.password !== credentials.password) {
      throw new Error('Invalid demo credentials');
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const { password, ...userWithoutPassword } = demoUser;
    return {
      ...userWithoutPassword,
      token: `demo_token_${Date.now()}`,
    };
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      console.log('Login attempt for:', credentials.email);
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      let user: User;

      try {
        // Try API login first with a timeout
        const timeoutPromise = new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('API timeout')), 5000)
        );
        
        user = await Promise.race([
          loginWithAPI(credentials),
          timeoutPromise
        ]);
        console.log('API login successful');
      } catch (apiError) {
        console.log('API login failed, trying demo mode:', apiError);
        // Fallback to demo login
        user = await loginWithDemo(credentials);
        console.log('Demo login successful');
      }

      // Store auth data
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, user.token);
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
      console.log('Auth data stored');

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      console.log('Login complete, user authenticated');
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
      console.log('Logging out...');
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      await AsyncStorage.removeItem(USER_DATA_KEY);

      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      console.log('Logout complete');
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
