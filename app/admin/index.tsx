
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { colors, darkColors } from '@/styles/commonStyles';

export default function AdminDashboard() {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuth();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  // Redirect if not admin
  if (user?.role !== 'admin') {
    return (
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.errorText, { color: themeColors.text }]}>
          Access Denied. Admin privileges required.
        </Text>
      </View>
    );
  }

  const adminModules = [
    {
      id: 'schools',
      title: 'School Management',
      icon: 'building.2.fill',
      route: '/admin/schools',
      color: colors.primary,
      description: 'Manage schools, departments & classes',
    },
    {
      id: 'users',
      title: 'User Management',
      icon: 'person.3.fill',
      route: '/admin/users',
      color: colors.secondary,
      description: 'Create & manage user accounts',
    },
    {
      id: 'finance',
      title: 'Finance & Fees',
      icon: 'dollarsign.circle.fill',
      route: '/admin/finance',
      color: colors.warning,
      description: 'Invoices, payments & reports',
    },
    {
      id: 'academic',
      title: 'Academic Control',
      icon: 'graduationcap.fill',
      route: '/admin/academic',
      color: colors.accent,
      description: 'Timetables, exams & grading',
    },
    {
      id: 'library',
      title: 'Library Management',
      icon: 'book.fill',
      route: '/admin/library',
      color: '#9C27B0',
      description: 'Books, authors & resources',
    },
    {
      id: 'hr',
      title: 'HR & Staff',
      icon: 'briefcase.fill',
      route: '/admin/hr',
      color: '#FF5722',
      description: 'Staff, attendance & payroll',
    },
    {
      id: 'communication',
      title: 'Communication',
      icon: 'megaphone.fill',
      route: '/admin/communication',
      color: '#00BCD4',
      description: 'Notifications, SMS & emails',
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'gearshape.fill',
      route: '/admin/settings',
      color: '#607D8B',
      description: 'System configuration',
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Admin Dashboard',
          headerShown: Platform.OS === 'ios',
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: themeColors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={[styles.headerCard, { backgroundColor: themeColors.card }]}>
          <IconSymbol name="shield.checkered" size={48} color={colors.primary} />
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>
            Admin Control Panel
          </Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
            Manage your institution
          </Text>
        </View>

        <View style={styles.modulesContainer}>
          {adminModules.map((module) => (
            <TouchableOpacity
              key={module.id}
              style={[styles.moduleCard, { backgroundColor: themeColors.card }]}
              onPress={() => router.push(module.route as any)}
            >
              <View style={[styles.moduleIconContainer, { backgroundColor: module.color + '20' }]}>
                <IconSymbol name={module.icon as any} size={28} color={module.color} />
              </View>
              <View style={styles.moduleContent}>
                <Text style={[styles.moduleTitle, { color: themeColors.text }]}>
                  {module.title}
                </Text>
                <Text style={[styles.moduleDescription, { color: themeColors.textSecondary }]}>
                  {module.description}
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={themeColors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  headerCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  modulesContainer: {
    gap: 12,
  },
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moduleIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  moduleContent: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 13,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
  },
});
