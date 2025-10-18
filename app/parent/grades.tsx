
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

export default function ParentGrades() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [selectedChild, setSelectedChild] = useState('John Kamau');

  const children = ['John Kamau', 'Mary Kamau'];

  const exams = [
    {
      id: '1',
      title: 'Mid-Term Exam',
      subject: 'Mathematics',
      date: '2024-02-15',
      totalMarks: 100,
      obtainedMarks: 85,
      grade: 'A',
      status: 'graded',
    },
    {
      id: '2',
      title: 'Unit Test 3',
      subject: 'Physics',
      date: '2024-02-10',
      totalMarks: 50,
      obtainedMarks: 42,
      grade: 'B+',
      status: 'graded',
    },
    {
      id: '3',
      title: 'Final Exam',
      subject: 'Chemistry',
      date: '2024-02-25',
      totalMarks: 100,
      status: 'upcoming',
    },
  ];

  const subjects = [
    { name: 'Mathematics', grade: 'A', percentage: 85, teacher: 'Mr. Anderson' },
    { name: 'Physics', grade: 'B+', percentage: 78, teacher: 'Dr. Smith' },
    { name: 'Chemistry', grade: 'A-', percentage: 82, teacher: 'Mrs. Johnson' },
    { name: 'Biology', grade: 'B', percentage: 75, teacher: 'Mr. Brown' },
    { name: 'English', grade: 'A', percentage: 88, teacher: 'Ms. Davis' },
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return colors.secondary;
    if (grade.startsWith('B')) return colors.primary;
    if (grade.startsWith('C')) return colors.warning;
    return colors.error;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Grades & Exams',
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

          <View style={[styles.overallCard, { backgroundColor: colors.secondary + '20' }]}>
            <Text style={[styles.overallGrade, { color: colors.secondary }]}>A</Text>
            <Text style={[styles.overallLabel, { color: colors.secondary }]}>
              Overall Performance
            </Text>
          </View>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Subject Performance
          </Text>

          {subjects.map((subject, index) => (
            <View
              key={index}
              style={[styles.subjectCard, { backgroundColor: themeColors.card }]}
            >
              <View style={styles.subjectHeader}>
                <View style={styles.subjectInfo}>
                  <Text style={[styles.subjectName, { color: themeColors.text }]}>
                    {subject.name}
                  </Text>
                  <Text style={[styles.subjectTeacher, { color: themeColors.textSecondary }]}>
                    {subject.teacher}
                  </Text>
                </View>
                <View
                  style={[
                    styles.gradeBadge,
                    { backgroundColor: getGradeColor(subject.grade) + '20' },
                  ]}
                >
                  <Text
                    style={[styles.gradeText, { color: getGradeColor(subject.grade) }]}
                  >
                    {subject.grade}
                  </Text>
                </View>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${subject.percentage}%`,
                      backgroundColor: getGradeColor(subject.grade),
                    },
                  ]}
                />
              </View>
              <Text style={[styles.percentageText, { color: themeColors.textSecondary }]}>
                {subject.percentage}%
              </Text>
            </View>
          ))}

          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Recent Exams
          </Text>

          {exams.map((exam) => (
            <View
              key={exam.id}
              style={[styles.examCard, { backgroundColor: themeColors.card }]}
            >
              <View style={styles.examHeader}>
                <View style={styles.examInfo}>
                  <Text style={[styles.examTitle, { color: themeColors.text }]}>
                    {exam.title}
                  </Text>
                  <Text style={[styles.examSubject, { color: colors.primary }]}>
                    {exam.subject}
                  </Text>
                </View>
                {exam.status === 'graded' && (
                  <View
                    style={[
                      styles.examGradeBadge,
                      { backgroundColor: getGradeColor(exam.grade!) + '20' },
                    ]}
                  >
                    <Text
                      style={[styles.examGradeText, { color: getGradeColor(exam.grade!) }]}
                    >
                      {exam.grade}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.examDetails}>
                <View style={styles.detailItem}>
                  <IconSymbol name="calendar" size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    {new Date(exam.date).toLocaleDateString()}
                  </Text>
                </View>
                {exam.status === 'graded' && (
                  <Text style={[styles.examMarks, { color: themeColors.text }]}>
                    {exam.obtainedMarks}/{exam.totalMarks} marks
                  </Text>
                )}
                {exam.status === 'upcoming' && (
                  <View
                    style={[styles.upcomingBadge, { backgroundColor: colors.warning + '20' }]}
                  >
                    <Text style={[styles.upcomingText, { color: colors.warning }]}>
                      Upcoming
                    </Text>
                  </View>
                )}
              </View>
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
  overallCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  overallGrade: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 8,
  },
  overallLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 8,
  },
  subjectCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subjectTeacher: {
    fontSize: 13,
  },
  gradeBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },
  gradeText: {
    fontSize: 16,
    fontWeight: '700',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
  },
  percentageText: {
    fontSize: 12,
    textAlign: 'right',
  },
  examCard: {
    padding: 16,
    borderRadius: 12,
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
    alignItems: 'flex-start',
    marginBottom: 12,
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
    fontWeight: '500',
  },
  examGradeBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },
  examGradeText: {
    fontSize: 16,
    fontWeight: '700',
  },
  examDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
  },
  examMarks: {
    fontSize: 14,
    fontWeight: '600',
  },
  upcomingBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  upcomingText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
