
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, darkColors } from '@/styles/commonStyles';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  status: 'present' | 'absent' | 'late' | null;
}

export default function TeacherAttendance() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [selectedClass, setSelectedClass] = useState('Form 4A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'John Kamau', rollNumber: 'F4A001', status: null },
    { id: '2', name: 'Mary Wanjiru', rollNumber: 'F4A002', status: null },
    { id: '3', name: 'Peter Ochieng', rollNumber: 'F4A003', status: null },
    { id: '4', name: 'Grace Akinyi', rollNumber: 'F4A004', status: null },
    { id: '5', name: 'David Mwangi', rollNumber: 'F4A005', status: null },
    { id: '6', name: 'Sarah Njeri', rollNumber: 'F4A006', status: null },
    { id: '7', name: 'James Otieno', rollNumber: 'F4A007', status: null },
    { id: '8', name: 'Lucy Wambui', rollNumber: 'F4A008', status: null },
  ]);

  const classes = ['Form 4A', 'Form 3B', 'Form 4B', 'Form 3A', 'Form 2A'];

  const updateAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

  const markAllPresent = () => {
    setStudents((prev) => prev.map((student) => ({ ...student, status: 'present' })));
  };

  const handleSubmit = () => {
    const unmarked = students.filter((s) => s.status === null);
    if (unmarked.length > 0) {
      Alert.alert(
        'Incomplete Attendance',
        `${unmarked.length} student(s) not marked. Continue?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Submit',
            onPress: () => {
              Alert.alert('Success', 'Attendance submitted successfully');
              console.log('Attendance submitted:', students);
            },
          },
        ]
      );
    } else {
      Alert.alert('Success', 'Attendance submitted successfully');
      console.log('Attendance submitted:', students);
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'present':
        return colors.secondary;
      case 'absent':
        return colors.error;
      case 'late':
        return colors.warning;
      default:
        return '#CCCCCC';
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case 'present':
        return 'checkmark.circle.fill';
      case 'absent':
        return 'xmark.circle.fill';
      case 'late':
        return 'clock.fill';
      default:
        return 'circle';
    }
  };

  const stats = {
    present: students.filter((s) => s.status === 'present').length,
    absent: students.filter((s) => s.status === 'absent').length,
    late: students.filter((s) => s.status === 'late').length,
    unmarked: students.filter((s) => s.status === null).length,
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Take Attendance',
          headerShown: true,
        }}
      />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={[styles.header, { backgroundColor: themeColors.card }]}>
          <View style={styles.dateContainer}>
            <IconSymbol name="calendar" size={20} color={colors.primary} />
            <Text style={[styles.dateText, { color: themeColors.text }]}>
              {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.classSelector}
          >
            {classes.map((className) => (
              <TouchableOpacity
                key={className}
                style={[
                  styles.classChip,
                  selectedClass === className && {
                    backgroundColor: colors.primary,
                  },
                ]}
                onPress={() => setSelectedClass(className)}
              >
                <Text
                  style={[
                    styles.classChipText,
                    {
                      color:
                        selectedClass === className ? '#FFFFFF' : themeColors.text,
                    },
                  ]}
                >
                  {className}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={[styles.statDot, { backgroundColor: colors.secondary }]} />
              <Text style={[styles.statText, { color: themeColors.textSecondary }]}>
                Present: {stats.present}
              </Text>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statDot, { backgroundColor: colors.error }]} />
              <Text style={[styles.statText, { color: themeColors.textSecondary }]}>
                Absent: {stats.absent}
              </Text>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statDot, { backgroundColor: colors.warning }]} />
              <Text style={[styles.statText, { color: themeColors.textSecondary }]}>
                Late: {stats.late}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.markAllButton, { backgroundColor: colors.secondary }]}
            onPress={markAllPresent}
          >
            <IconSymbol name="checkmark.circle.fill" size={20} color="#FFFFFF" />
            <Text style={styles.markAllText}>Mark All Present</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.studentsList} contentContainerStyle={styles.studentsContent}>
          {students.map((student) => (
            <View
              key={student.id}
              style={[styles.studentCard, { backgroundColor: themeColors.card }]}
            >
              <View style={styles.studentInfo}>
                <View
                  style={[
                    styles.studentAvatar,
                    { backgroundColor: getStatusColor(student.status) + '20' },
                  ]}
                >
                  <IconSymbol
                    name={getStatusIcon(student.status) as any}
                    size={24}
                    color={getStatusColor(student.status)}
                  />
                </View>
                <View style={styles.studentDetails}>
                  <Text style={[styles.studentName, { color: themeColors.text }]}>
                    {student.name}
                  </Text>
                  <Text style={[styles.studentRoll, { color: themeColors.textSecondary }]}>
                    {student.rollNumber}
                  </Text>
                </View>
              </View>

              <View style={styles.statusButtons}>
                <TouchableOpacity
                  style={[
                    styles.statusButton,
                    student.status === 'present' && {
                      backgroundColor: colors.secondary,
                    },
                  ]}
                  onPress={() => updateAttendance(student.id, 'present')}
                >
                  <IconSymbol
                    name="checkmark.circle.fill"
                    size={20}
                    color={student.status === 'present' ? '#FFFFFF' : colors.secondary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.statusButton,
                    student.status === 'late' && {
                      backgroundColor: colors.warning,
                    },
                  ]}
                  onPress={() => updateAttendance(student.id, 'late')}
                >
                  <IconSymbol
                    name="clock.fill"
                    size={20}
                    color={student.status === 'late' ? '#FFFFFF' : colors.warning}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.statusButton,
                    student.status === 'absent' && {
                      backgroundColor: colors.error,
                    },
                  ]}
                  onPress={() => updateAttendance(student.id, 'absent')}
                >
                  <IconSymbol
                    name="xmark.circle.fill"
                    size={20}
                    color={student.status === 'absent' ? '#FFFFFF' : colors.error}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: themeColors.card }]}>
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit Attendance</Text>
          </TouchableOpacity>
        </View>
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
  },
  classSelector: {
    marginBottom: 16,
  },
  classChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  classChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statText: {
    fontSize: 12,
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  markAllText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  studentsList: {
    flex: 1,
  },
  studentsContent: {
    padding: 16,
    paddingBottom: 100,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  studentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  studentRoll: {
    fontSize: 14,
  },
  statusButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  statusButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
