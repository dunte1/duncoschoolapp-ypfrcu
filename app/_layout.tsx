
import 'react-native-reanimated';
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SystemBars } from 'react-native-edge-to-edge';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme, Alert } from 'react-native';
import { useNetworkState } from 'expo-network';
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { WidgetProvider } from '@/contexts/WidgetContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { colors, darkColors } from '@/styles/commonStyles';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'login',
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const networkState = useNetworkState();
  const { isAuthenticated, isLoading } = useAuth();

  React.useEffect(() => {
    if (
      !networkState.isConnected &&
      networkState.isInternetReachable === false
    ) {
      Alert.alert(
        '🔌 You are offline',
        'Some features may not be available. Your changes will be synced when you are back online.'
      );
    }
  }, [networkState.isConnected, networkState.isInternetReachable]);

  React.useEffect(() => {
    console.log('Auth state changed - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated);
    
    if (!isLoading) {
      if (isAuthenticated) {
        console.log('User is authenticated, navigating to home');
        router.replace('/(tabs)/(home)');
      } else {
        console.log('User is not authenticated, navigating to login');
        router.replace('/login');
      }
    }
  }, [isAuthenticated, isLoading]);

  const CustomDefaultTheme: Theme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.error,
    },
  };

  const CustomDarkTheme: Theme = {
    ...DarkTheme,
    colors: {
      primary: darkColors.primary,
      background: darkColors.background,
      card: darkColors.card,
      text: darkColors.text,
      border: darkColors.border,
      notification: darkColors.error,
    },
  };

  if (isLoading) {
    console.log('Auth is loading, showing splash screen');
    return null;
  }

  return (
    <ThemeProvider
      value={colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="attendance"
          options={{
            presentation: 'card',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="exams"
          options={{
            presentation: 'card',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="library"
          options={{
            presentation: 'card',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="finance"
          options={{
            presentation: 'card',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="messages"
          options={{
            presentation: 'card',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="notifications"
          options={{
            presentation: 'card',
            headerShown: true,
          }}
        />
      </Stack>
      <SystemBars style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" animated />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <WidgetProvider>
          <AuthProvider>
            <RootLayoutNav />
          </AuthProvider>
        </WidgetProvider>
      </GestureHandlerRootView>
    </>
  );
}
