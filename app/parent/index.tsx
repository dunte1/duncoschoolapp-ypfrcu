
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

export default function ParentDashboard() {
  const theme = useTheme();
  const router = useRouter();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const modules = [
    {
      id: 'children',
      title: 'My Children',
      icon: 'person.2.fill',
      route: '/parent/children',
      color: colors.primary,
      description: 'View profiles & progress',
    },
    {
      id: 'attendance',
      title: 'Attendance',
      icon: 'checkmark.circle.fill',
      route: '/parent/attendance',
      color: colors.secondary,
      description: 'Track attendance',
    },
    {
      id: 'grades',
      title: 'Grades & Exams',
      icon: 'chart.bar.fill',
      route: '/parent/grades',
      color: colors.accent,
      description: 'View academic performance',
    },
    {
      id: 'fees',
      title: 'Fees & Payments',
      icon: 'dollarsign.circle.fill',
      route: '/parent/fees',
      color: colors.warning,
      description: 'Manage payments',
    },
    {
      id: 'reports',
      title: 'Reports',
      icon: 'doc.text.fill',
      route: '/parent/reports',
      color: colors.error,
      description: 'View report cards',
    },
    {
      id: 'communication',
      title: 'Communication',
      icon: 'envelope.fill',
      route: '/parent/communication',
      color: colors.primary,
      description: 'Messages & notices',
    },
    {
      id: 'calendar',
      title: 'School Calendar',
      icon: 'calendar',
      route: '/parent/calendar',
      color: colors.secondary,
      description: 'Events & schedules',
    },
    {
      id: 'assignments',
      title: 'Assignments',
      icon: 'folder.fill',
      route: '/parent/assignments',
      color: colors.accent,
      description: 'Track homework',
    },
  ];

  const children = [
    { name: 'John Kamau', class: 'Form 4A', attendance: 95, performance: 'A' },
    { name: 'Mary Kamau', class: 'Form 2B', attendance: 92, performance: 'B+' },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Parent Dashboard',
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
            Parent Portal
          </Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
            Monitor your children&apos;s progress
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          My Children
        </Text>

        {children.map((child, index) => (
          <View
            key={index}
            style={[styles.childCard, { backgroundColor: themeColors.card }]}
          >
            <View style={[styles.childAvatar, { backgroundColor: colors.primary + '20' }]}>
              <Text style={[styles.childInitial, { color: colors.primary }]}>
                {child.name.charAt(0)}
              </Text>
            </View>
            <View style={styles.childInfo}>
              <Text style={[styles.childName, { color: themeColors.text }]}>
                {child.name}
              </Text>
              <Text style={[styles.childClass, { color: themeColors.textSecondary }]}>
                {child.class}
              </Text>
            </View>
            <View style={styles.childStats}>
              <View style={styles.statBadge}>
                <IconSymbol name="checkmark.circle.fill" size={16} color={colors.secondary} />
                <Text style={[styles.statText, { color: themeColors.text }]}>
                  {child.attendance}%
                </Text>
              </View>
              <View
                style={[
                  styles.performanceBadge,
                  { backgroundColor: colors.secondary + '20' },
                ]}
              >
                <Text style={[styles.performanceText, { color: colors.secondary }]}>
                  {child.performance}
                </Text>
              </View>
            </View>
          </View>
        ))}

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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 8,
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  childAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  childInitial: {
    fontSize: 24,
    fontWeight: '700',
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  childClass: {
    fontSize: 14,
  },
  childStats: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
  },
  performanceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  performanceText: {
    fontSize: 14,
    fontWeight: '700',
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
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 11,
  },
});
