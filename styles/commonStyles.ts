
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  background: '#F5F5F5',
  text: '#212121',
  textSecondary: '#757575',
  primary: '#2962FF',
  secondary: '#4CAF50',
  accent: '#FFAB40',
  card: '#FFFFFF',
  highlight: '#FFD54F',
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FF9800',
  border: '#E0E0E0',
};

export const darkColors = {
  background: '#121212',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  primary: '#2962FF',
  secondary: '#4CAF50',
  accent: '#FFAB40',
  card: '#1E1E1E',
  highlight: '#FFD54F',
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FF9800',
  border: '#333333',
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
