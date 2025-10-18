
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, darkColors } from '@/styles/commonStyles';

export default function ParentAssignments() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [selectedChild, setSelectedChild] = useState('John Kamau');

  const children = ['John Kamau', 'Mary Kamau'];

  const assignments = [
    {
      id: '1',
      title: 'Quadratic Equations Worksheet',
      subject: 'Mathematics',
      dueDate: '2024-02-25',
      status: 'pending',
      description: 'Complete exercises 1-10 from Chapter 5',
    },
    {
      id: '2',
      title: 'Physics Lab Report',
      subject: 'Physics',
      dueDate: '2024-02-28',
      status: 'pending',
      description: 'Write a report on the pendulum experiment',
    },
    {
      id: '3',
      title: 'English Essay',
      subject: 'English',
      dueDate: '2024-02-20',
      status: 'submitted',
      submittedDate: '2024-02-19',
      grade: 'A',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return colors.secondary;
      case 'pending':
        return colors.warning;
      case 'overdue':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'checkmark.circle.fill';
      case 'pending':
        return 'clock.fill';
      case 'overdue':
        return 'exclamationmark.circle.fill';
      default:
        return 'circle';
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Assignments',
          headerShown: true,
        }}
      />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={[styles.header, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>
            Select Child
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.childSelector}
          >
            {children.map((child) => (
              <TouchableOpacity
                key={child}
                style={[
                  styles.childChip,
                  selectedChild === child && { backgroundColor: colors.primary },
                ]}
                onPress={() => setSelectedChild(child)}
              >
                <Text
                  style={[
                    styles.childChipText,
                    { color: selectedChild === child ? '#FFFFFF' : themeColors.text },
                  ]}
                >
                  {child}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.warning }]}>
                {assignments.filter((a) => a.status === 'pending').length}
              </Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                Pending
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.secondary }]}>
                {assignments.filter((a) => a.status === 'submitted').length}
              </Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                Submitted
              </Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {assignments.map((assignment) => (
            <View
              key={assignment.id}
              style={[styles.assignmentCard, { backgroundColor: themeColors.card }]}
            >
              <View style={styles.assignmentHeader}>
                <View
                  style={[
                    styles.assignmentIcon,
                    { backgroundColor: getStatusColor(assignment.status) + '20' },
                  ]}
                >
                  <IconSymbol
                    name={getStatusIcon(assignment.status) as any}
                    size={24}
                    color={getStatusColor(assignment.status)}
                  />
                </View>
                <View style={styles.assignmentInfo}>
                  <Text style={[styles.assignmentTitle, { color: themeColors.text }]}>
                    {assignment.title}
                  </Text>
                  <Text style={[styles.assignmentSubject, { color: colors.primary }]}>
                    {assignment.subject}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(assignment.status) + '20' },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(assignment.status) },
                    ]}
                  >
                    {assignment.status}
                  </Text>
                </View>
              </View>

              <Text style={[styles.assignmentDescription, { color: themeColors.textSecondary }]}>
                {assignment.description}
              </Text>

              <View style={styles.assignmentDetails}>
                <View style={styles.detailItem}>
                  <IconSymbol name="calendar" size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </Text>
                </View>
              </View>

              {assignment.status === 'submitted' && assignment.grade && (
                <View style={[styles.gradeBadge, { backgroundColor: colors.secondary + '20' }]}>
                  <Text style={[styles.gradeText, { color: colors.secondary }]}>
                    Grade: {assignment.grade}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  childSelector: {
    marginBottom: 16,
  },
  childChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  childChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  assignmentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  assignmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  assignmentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  assignmentSubject: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  assignmentDescription: {
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 18,
  },
  assignmentDetails: {
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
  },
  gradeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  gradeText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
