
import React from 'react';
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
import { mockExams } from '@/utils/mockData';

export default function ExamsScreen() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'graded':
        return colors.success;
      case 'completed':
        return colors.primary;
      case 'upcoming':
        return colors.warning;
      default:
        return colors.textSecondary;
    }
  };

  const getGradeColor = (grade?: string) => {
    if (!grade) return colors.textSecondary;
    if (grade.startsWith('A')) return colors.success;
    if (grade.startsWith('B')) return colors.primary;
    if (grade.startsWith('C')) return colors.warning;
    return colors.error;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Exams',
          headerShown: true,
          headerBackTitle: 'Back',
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: themeColors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={[styles.statsCard, { backgroundColor: themeColors.card }]}>
          <View style={styles.statItem}>
            <IconSymbol name="doc.text.fill" size={32} color={colors.primary} />
            <Text style={[styles.statValue, { color: themeColors.text }]}>12</Text>
            <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
              Total Exams
            </Text>
          </View>
          <View style={styles.statItem}>
            <IconSymbol name="checkmark.circle.fill" size={32} color={colors.success} />
            <Text style={[styles.statValue, { color: themeColors.text }]}>8</Text>
            <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
              Completed
            </Text>
          </View>
          <View style={styles.statItem}>
            <IconSymbol name="clock.fill" size={32} color={colors.warning} />
            <Text style={[styles.statValue, { color: themeColors.text }]}>4</Text>
            <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
              Upcoming
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          All Exams
        </Text>

        {mockExams.map((exam) => (
          <View
            key={exam.id}
            style={[styles.examCard, { backgroundColor: themeColors.card }]}
          >
            <View style={styles.examHeader}>
              <View style={styles.examLeft}>
                <View
                  style={[
                    styles.subjectIcon,
                    { backgroundColor: colors.primary + '20' },
                  ]}
                >
                  <IconSymbol name="book.fill" size={24} color={colors.primary} />
                </View>
                <View style={styles.examInfo}>
                  <Text style={[styles.examTitle, { color: themeColors.text }]}>
                    {exam.title}
                  </Text>
                  <Text style={[styles.examSubject, { color: themeColors.textSecondary }]}>
                    {exam.subject}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(exam.status) },
                ]}
              >
                <Text style={styles.statusText}>{exam.status.toUpperCase()}</Text>
              </View>
            </View>

            <View style={styles.examDetails}>
              <View style={styles.detailRow}>
                <IconSymbol
                  name="calendar"
                  size={16}
                  color={themeColors.textSecondary}
                />
                <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                  {new Date(exam.date).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <IconSymbol
                  name="clock"
                  size={16}
                  color={themeColors.textSecondary}
                />
                <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                  {exam.duration}
                </Text>
              </View>
            </View>

            {exam.status === 'graded' && (
              <View style={styles.gradeSection}>
                <View style={styles.gradeRow}>
                  <Text style={[styles.gradeLabel, { color: themeColors.textSecondary }]}>
                    Score:
                  </Text>
                  <Text style={[styles.gradeValue, { color: themeColors.text }]}>
                    {exam.obtainedMarks}/{exam.totalMarks}
                  </Text>
                </View>
                <View
                  style={[
                    styles.gradeBadge,
                    { backgroundColor: getGradeColor(exam.grade) },
                  ]}
                >
                  <Text style={styles.gradeText}>{exam.grade}</Text>
                </View>
              </View>
            )}
          </View>
        ))}
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
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  examCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  examLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  subjectIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  examInfo: {
    flex: 1,
  },
  examTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  examSubject: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  examDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
  },
  gradeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  gradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gradeLabel: {
    fontSize: 14,
  },
  gradeValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  gradeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  gradeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
