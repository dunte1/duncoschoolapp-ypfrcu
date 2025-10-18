
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, darkColors } from '@/styles/commonStyles';

interface ClassInfo {
  id: string;
  name: string;
  subject: string;
  students: number;
  schedule: string;
  room: string;
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  phone: string;
  attendance: number;
  performance: string;
}

export default function TeacherClasses() {
  const theme = useTheme();
  const router = useRouter();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const classes: ClassInfo[] = [
    {
      id: '1',
      name: 'Form 4A',
      subject: 'Mathematics',
      students: 32,
      schedule: 'Mon, Wed, Fri - 8:00 AM',
      room: 'Room 101',
    },
    {
      id: '2',
      name: 'Form 3B',
      subject: 'Mathematics',
      students: 28,
      schedule: 'Tue, Thu - 10:00 AM',
      room: 'Room 102',
    },
    {
      id: '3',
      name: 'Form 4B',
      subject: 'Physics',
      students: 30,
      schedule: 'Mon, Wed - 2:00 PM',
      room: 'Lab 1',
    },
    {
      id: '4',
      name: 'Form 3A',
      subject: 'Physics',
      students: 26,
      schedule: 'Tue, Thu - 11:00 AM',
      room: 'Lab 2',
    },
    {
      id: '5',
      name: 'Form 2A',
      subject: 'Mathematics',
      students: 26,
      schedule: 'Daily - 9:00 AM',
      room: 'Room 103',
    },
  ];

  const students: Student[] = [
    {
      id: '1',
      name: 'John Kamau',
      rollNumber: 'F4A001',
      email: 'john.kamau@school.com',
      phone: '+254712345678',
      attendance: 95,
      performance: 'A',
    },
    {
      id: '2',
      name: 'Mary Wanjiru',
      rollNumber: 'F4A002',
      email: 'mary.wanjiru@school.com',
      phone: '+254723456789',
      attendance: 92,
      performance: 'A-',
    },
    {
      id: '3',
      name: 'Peter Ochieng',
      rollNumber: 'F4A003',
      email: 'peter.ochieng@school.com',
      phone: '+254734567890',
      attendance: 88,
      performance: 'B+',
    },
    {
      id: '4',
      name: 'Grace Akinyi',
      rollNumber: 'F4A004',
      email: 'grace.akinyi@school.com',
      phone: '+254745678901',
      attendance: 97,
      performance: 'A',
    },
    {
      id: '5',
      name: 'David Mwangi',
      rollNumber: 'F4A005',
      email: 'david.mwangi@school.com',
      phone: '+254756789012',
      attendance: 85,
      performance: 'B',
    },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewStudents = (classInfo: ClassInfo) => {
    setSelectedClass(classInfo);
    setShowStudentModal(true);
  };

  const getPerformanceColor = (performance: string) => {
    if (performance.startsWith('A')) return colors.secondary;
    if (performance.startsWith('B')) return colors.primary;
    if (performance.startsWith('C')) return colors.warning;
    return colors.error;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'My Classes',
          headerShown: true,
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: themeColors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={[styles.summaryCard, { backgroundColor: themeColors.card }]}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: themeColors.text }]}>5</Text>
            <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>
              Total Classes
            </Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: themeColors.text }]}>142</Text>
            <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>
              Total Students
            </Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: themeColors.text }]}>2</Text>
            <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>
              Subjects
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          Assigned Classes
        </Text>

        {classes.map((classInfo) => (
          <TouchableOpacity
            key={classInfo.id}
            style={[styles.classCard, { backgroundColor: themeColors.card }]}
            onPress={() => handleViewStudents(classInfo)}
          >
            <View style={styles.classHeader}>
              <View style={[styles.classIcon, { backgroundColor: colors.primary + '20' }]}>
                <IconSymbol name="person.3.fill" size={24} color={colors.primary} />
              </View>
              <View style={styles.classInfo}>
                <Text style={[styles.className, { color: themeColors.text }]}>
                  {classInfo.name}
                </Text>
                <Text style={[styles.classSubject, { color: colors.primary }]}>
                  {classInfo.subject}
                </Text>
              </View>
              <IconSymbol
                name="chevron.right"
                size={20}
                color={themeColors.textSecondary}
              />
            </View>

            <View style={styles.classDetails}>
              <View style={styles.detailItem}>
                <IconSymbol
                  name="person.2.fill"
                  size={16}
                  color={themeColors.textSecondary}
                />
                <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                  {classInfo.students} Students
                </Text>
              </View>
              <View style={styles.detailItem}>
                <IconSymbol name="clock.fill" size={16} color={themeColors.textSecondary} />
                <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                  {classInfo.schedule}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <IconSymbol
                  name="location.fill"
                  size={16}
                  color={themeColors.textSecondary}
                />
                <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                  {classInfo.room}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={showStudentModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowStudentModal(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: themeColors.background }]}>
          <View style={[styles.modalHeader, { backgroundColor: themeColors.card }]}>
            <TouchableOpacity onPress={() => setShowStudentModal(false)}>
              <IconSymbol name="xmark" size={24} color={themeColors.text} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: themeColors.text }]}>
              {selectedClass?.name} - Students
            </Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.searchContainer}>
            <IconSymbol name="magnifyingglass" size={20} color={themeColors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: themeColors.text }]}
              placeholder="Search students..."
              placeholderTextColor={themeColors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView style={styles.studentsList}>
            {filteredStudents.map((student) => (
              <TouchableOpacity
                key={student.id}
                style={[styles.studentCard, { backgroundColor: themeColors.card }]}
                onPress={() => {
                  Alert.alert('Student Profile', `View profile for ${student.name}`);
                }}
              >
                <View style={styles.studentHeader}>
                  <View
                    style={[styles.studentAvatar, { backgroundColor: colors.primary + '20' }]}
                  >
                    <Text style={[styles.studentInitial, { color: colors.primary }]}>
                      {student.name.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.studentInfo}>
                    <Text style={[styles.studentName, { color: themeColors.text }]}>
                      {student.name}
                    </Text>
                    <Text style={[styles.studentRoll, { color: themeColors.textSecondary }]}>
                      {student.rollNumber}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.performanceBadge,
                      { backgroundColor: getPerformanceColor(student.performance) + '20' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.performanceText,
                        { color: getPerformanceColor(student.performance) },
                      ]}
                    >
                      {student.performance}
                    </Text>
                  </View>
                </View>

                <View style={styles.studentStats}>
                  <View style={styles.statItem}>
                    <IconSymbol
                      name="checkmark.circle.fill"
                      size={16}
                      color={colors.secondary}
                    />
                    <Text style={[styles.statText, { color: themeColors.textSecondary }]}>
                      {student.attendance}% Attendance
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <IconSymbol name="envelope.fill" size={16} color={colors.primary} />
                    <Text style={[styles.statText, { color: themeColors.textSecondary }]}>
                      {student.email}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
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
  summaryCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  classCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  classHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  classIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  classSubject: {
    fontSize: 14,
    fontWeight: '500',
  },
  classDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  studentsList: {
    flex: 1,
    padding: 16,
  },
  studentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  studentInitial: {
    fontSize: 20,
    fontWeight: '600',
  },
  studentInfo: {
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
  performanceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  performanceText: {
    fontSize: 14,
    fontWeight: '600',
  },
  studentStats: {
    gap: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 13,
  },
});
