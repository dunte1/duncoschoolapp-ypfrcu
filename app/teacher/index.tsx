
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
import { colors, darkColors } from '@/styles/commonStyles';

export default function TeacherDashboard() {
  const theme = useTheme();
  const router = useRouter();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const modules = [
    {
      id: 'classes',
      title: 'My Classes',
      icon: 'person.3.fill',
      route: '/teacher/classes',
      color: colors.primary,
      description: 'View assigned classes',
    },
    {
      id: 'attendance',
      title: 'Attendance',
      icon: 'checkmark.circle.fill',
      route: '/teacher/attendance',
      color: colors.secondary,
      description: 'Take attendance',
    },
    {
      id: 'exams',
      title: 'Exams & Marks',
      icon: 'doc.text.fill',
      route: '/teacher/exams',
      color: colors.accent,
      description: 'Create & mark exams',
    },
    {
      id: 'assignments',
      title: 'Assignments',
      icon: 'folder.fill',
      route: '/teacher/assignments',
      color: colors.warning,
      description: 'Upload & track',
    },
    {
      id: 'communication',
      title: 'Communication',
      icon: 'envelope.fill',
      route: '/teacher/communication',
      color: colors.primary,
      description: 'Messages & announcements',
    },
    {
      id: 'timetable',
      title: 'Timetable',
      icon: 'calendar',
      route: '/teacher/timetable',
      color: colors.secondary,
      description: 'View schedules',
    },
    {
      id: 'resources',
      title: 'Resources',
      icon: 'book.fill',
      route: '/teacher/resources',
      color: colors.accent,
      description: 'Teaching materials',
    },
    {
      id: 'reports',
      title: 'Reports',
      icon: 'chart.bar.fill',
      route: '/teacher/reports',
      color: colors.error,
      description: 'Generate reports',
    },
  ];

  const stats = [
    { label: 'Classes', value: '5', icon: 'person.3.fill', color: colors.primary },
    { label: 'Students', value: '142', icon: 'person.2.fill', color: colors.secondary },
    { label: 'Pending Marks', value: '23', icon: 'exclamationmark.circle.fill', color: colors.warning },
    { label: 'Assignments', value: '8', icon: 'folder.fill', color: colors.accent },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Teacher Dashboard',
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
        <View style={[styles.headerCard, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>
            Teacher Portal
          </Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
            Manage your classes and students
          </Text>
        </View>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View
              key={index}
              style={[styles.statCard, { backgroundColor: themeColors.card }]}
            >
              <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                <IconSymbol name={stat.icon as any} size={24} color={stat.color} />
              </View>
              <Text style={[styles.statValue, { color: themeColors.text }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                {stat.label}
              </Text>
            </View>
          ))}
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
                <IconSymbol name={module.icon as any} size={28} color={module.color} />
              </View>
              <Text style={[styles.moduleTitle, { color: themeColors.text }]}>
                {module.title}
              </Text>
              <Text style={[styles.moduleDescription, { color: themeColors.textSecondary }]}>
                {module.description}
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
  headerCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
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
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moduleIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 12,
  },
});
