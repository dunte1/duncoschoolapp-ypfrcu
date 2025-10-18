
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

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuth();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const getRoleBasedModules = () => {
    const baseModules = [
      { id: 'notifications', title: 'Notifications', icon: 'bell.fill', route: '/notifications', color: colors.accent },
      { id: 'messages', title: 'Messages', icon: 'envelope.fill', route: '/messages', color: colors.primary },
      { id: 'profile', title: 'Profile', icon: 'person.fill', route: '/(tabs)/profile', color: colors.secondary },
    ];

    switch (user?.role) {
      case 'admin':
        return [
          { id: 'admin-panel', title: 'Admin Panel', icon: 'shield.checkered', route: '/admin', color: colors.error },
          { id: 'attendance', title: 'Attendance', icon: 'checkmark.circle.fill', route: '/attendance', color: colors.secondary },
          { id: 'exams', title: 'Exams', icon: 'doc.text.fill', route: '/exams', color: colors.primary },
          { id: 'library', title: 'Library', icon: 'book.fill', route: '/library', color: colors.accent },
          { id: 'finance', title: 'Finance', icon: 'dollarsign.circle.fill', route: '/finance', color: colors.warning },
          ...baseModules,
        ];
      case 'teacher':
        return [
          { id: 'attendance', title: 'Attendance', icon: 'checkmark.circle.fill', route: '/attendance', color: colors.secondary },
          { id: 'exams', title: 'Exams', icon: 'doc.text.fill', route: '/exams', color: colors.primary },
          ...baseModules,
        ];
      case 'student':
        return [
          { id: 'attendance', title: 'My Attendance', icon: 'checkmark.circle.fill', route: '/attendance', color: colors.secondary },
          { id: 'exams', title: 'My Exams', icon: 'doc.text.fill', route: '/exams', color: colors.primary },
          { id: 'library', title: 'Library', icon: 'book.fill', route: '/library', color: colors.accent },
          { id: 'finance', title: 'Fees', icon: 'dollarsign.circle.fill', route: '/finance', color: colors.warning },
          ...baseModules,
        ];
      case 'parent':
        return [
          { id: 'attendance', title: 'Child Attendance', icon: 'checkmark.circle.fill', route: '/attendance', color: colors.secondary },
          { id: 'exams', title: 'Child Exams', icon: 'doc.text.fill', route: '/exams', color: colors.primary },
          { id: 'finance', title: 'Fees', icon: 'dollarsign.circle.fill', route: '/finance', color: colors.warning },
          ...baseModules,
        ];
      case 'librarian':
        return [
          { id: 'library', title: 'Library', icon: 'book.fill', route: '/library', color: colors.accent },
          ...baseModules,
        ];
      case 'accountant':
        return [
          { id: 'finance', title: 'Finance', icon: 'dollarsign.circle.fill', route: '/finance', color: colors.warning },
          ...baseModules,
        ];
      default:
        return baseModules;
    }
  };

  const modules = getRoleBasedModules();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Dashboard',
          headerShown: Platform.OS === 'ios',
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: themeColors.background }]}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar,
        ]}
      >
        <View style={[styles.welcomeCard, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.welcomeText, { color: themeColors.textSecondary }]}>
            Welcome back,
          </Text>
          <Text style={[styles.userName, { color: themeColors.text }]}>
            {user?.name || 'User'}
          </Text>
          <View style={[styles.roleBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.roleText}>{user?.role?.toUpperCase()}</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          Quick Access
        </Text>

        <View style={styles.modulesGrid}>
          {modules.map((module) => (
            <TouchableOpacity
              key={module.id}
              style={[styles.moduleCard, { backgroundColor: themeColors.card }]}
              onPress={() => router.push(module.route as any)}
            >
              <View style={[styles.moduleIcon, { backgroundColor: module.color + '20' }]}>
                <IconSymbol name={module.icon as any} size={32} color={module.color} />
              </View>
              <Text style={[styles.moduleTitle, { color: themeColors.text }]}>
                {module.title}
              </Text>
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
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  welcomeCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  roleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moduleCard: {
    width: '48%',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moduleIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  moduleTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
